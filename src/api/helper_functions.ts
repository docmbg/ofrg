const viewXML = "<View Scope='RecursiveAll'><Query><Where><Eq><FieldRef Name='FSObjType' /><Value Type='Integer'>0</Value></Eq></Where></Query></View>";
const readOptions: any = {
    method: 'GET', // or 'PUT'
    credentials: 'include',
    headers: {
        'Accept': 'application/json; odata=verbose',
        'content-type': 'application/json;odata=verbose',
        'Access-Control-Allow-Origin': '*'
    }
};
const postOptions = {
    method: 'POST', // or 'PUT'
    headers: {
        'Accept': 'application/json; odata=verbose',
        'content-type': 'application/json;odata=verbose',
        'X-RequestDigest': '',
        "X-HTTP-Method": "POST"

    },
    body: JSON.stringify({ 'query': { '__metadata': { 'type': 'SP.CamlQuery' }, 'ViewXml': viewXML } }),
}

export async function getUsers(mainUrl: string) {
    return await fetch(`${mainUrl}/_api/Web/siteusers`, readOptions).then(res => res.json()).then(res => res.d.results)
}

export function findUser(id: number, users:any){
    const user = users.filter((user: any)=> user.Id === id)[0];
    return user? user['Email']: '';
}

export async function getAllSubSites(url: string, arr: Array<Object>, siteUrl: string) {
    let promises: any = [];
    let fetchUrl = url !== siteUrl ? url : `${siteUrl}/_api/Web/webs?$expand=webs`;
    if (arr.length === 0) {
        let mainSite = await fetch(`${siteUrl}/_api/web?$expand=webs`, readOptions)
            .then(res => res.json())
            .then(res => res);
        arr.push({
            url: siteUrl,
            title: mainSite.d.Title,
            children: mainSite.d.Webs.results.map((e: any) => e.Url),
            WebTemplate: mainSite.d.WebTemplate,
        });
    }
    await fetch(fetchUrl, readOptions).then(res => res.json())
        // .catch(error => console.error('Error:', error))
        .then(response => {
            response.d.results.map((e: any) => {
                arr.push({
                    url: e.Url,
                    title: e.Title,
                    children: e.Webs.results.map((child: any) => child.Url),
                    WebTemplate: e.WebTemplate,
                });
                promises.push(getAllSubSites(`${e[`__metadata`][`uri`]}/webs?$expand=webs`, arr, siteUrl));

            });
        });
    return Promise.all(promises).then(res => res);
}

export async function getAllLists(url: string, libsOnly: boolean) {
    const getListsUrl = `${url}/_api/Web/Lists/?$expand=Fields, RootFolder, WorkflowAssociations, Items`;
    const lists = await fetch(getListsUrl, readOptions)
        .then(res => {
            console.log(res.ok, res.status, res.statusText);
            if (!res.ok) {
                console.log(res.statusText);
            }
            return res.json();
        })
        .then(response => {
            if (response.hasOwnProperty('d')) {
                if (libsOnly) {
                    return response.d.results.filter((e: any) => e[`BaseTemplate`] === 101);
                } else {
                    return response.d.results;
                }
            } else {
                return false;
            }
        });
    return lists;
}

export async function getAllFiles(sites: Array<any>, mainUrl: string) {
    let promises = [];
    let lists;
    let siteCounter = 0;
    let listCounter = 0;
    let batch = [];
    for (let site of sites) {
        promises.push(getAllLists(site.url, true));
    }
    lists = await Promise.all(promises);
    promises = [];
    for (let site of sites) {
        listCounter = 0;
        for (let list of lists[siteCounter]) {
            listCounter++;
            if (list.ItemCount < 4999 && !list.Title.includes('?')) {
                promises.push(getFilesFromLibrary(site.url, list.Title, mainUrl));
                // if(siteCounter === sites.length-1 && listCounter === lists[siteCounter].length-1){
                //     batch = await Promise.all(promises);
                //     allFiles.push(batch); 
                //     promises = [];
                // }
                // if(promises.length === 50){
                //     batch = await Promise.all(promises);
                //     allFiles.push(batch);
                //     promises = [];
                // }
            }
        }
        siteCounter++;
    }
    const allFiles = await Promise.all(promises);
    return allFiles;
}

async function getFilesFromLibrary(siteUrl: string, libraryName: string, mainUrl: string) {
    const digest = await updateDigest(mainUrl);
    postOptions.headers[`X-RequestDigest`] = digest;
    let files = await fetch(`${siteUrl}/_api/web/lists/getbytitle('${encodeURIComponent(libraryName)}')/getitems/?$expand=File`, postOptions).
        then(res => {
            if (res.status == 200) {
                return res.json();
            } else {

                return { results: [] }
            }
        }).then(res => {
            if (res.hasOwnProperty('d')) {
                res.d.results = res.d.results.map((file:any)=> {
                    file[`Library Location`] = siteUrl;
                    file[`Library`] = libraryName;
                    return file;
                });
                return res.d;
            } else {
                return res
            }
        }
        );
    return files;
}

async function updateDigest(mainUrl: string) {
    let digest = await fetch(`${mainUrl}/_api/contextinfo`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Accept': 'application/json; odata=verbose' },
    })
        .then(res => res.json())
        .then(res => res.d.GetContextWebInformation.FormDigestValue);

    return digest;
}

export async function detectStaticDocumentColumns(url: string) {
    // const headers = ['Type', 'Name', ...columns, 'Created By', 'Modified By', 'Created', 'Last Modified',
    // 'URL', 'ID', 'Library', 'Library Location']
    const fields = await fetch(`${url}/_api/Web/ContentTypes('0x0101')/?$expand=Fields`,
        readOptions).
        then(res => res.json()).then(res => res.d.Fields.results);
    const columnsObj: any = {
        'Document Origin': [],
        'Document Type': [],
        'Record Series Code': [],
        'Record Type': [],
        'Fiscal Year': [],
        'Archive Date': [],
    };
    for (let field of fields) {
        let phStatic = field.StaticName.toLowerCase();
        let phDisplay = field.Title.toLowerCase();
        if (phStatic.includes('origin') || phDisplay.includes('origin')) {
            columnsObj['Document Origin'].push(field.StaticName);
        } else if (
            (phStatic.includes('type') && phStatic.includes('document')) ||
            (phDisplay.includes('type') && phDisplay.includes('document'))
        ) {
            columnsObj['Document Type'].push(field.StaticName);
        } else if (
            (phStatic.includes('series') && phStatic.includes('code'))
        ) {
            columnsObj['Record Series Code'].push(field.StaticName);
        } else if (
            (phStatic.includes('type') && phStatic.includes('record'))
        ) {
            columnsObj['Record Type'].push(field.StaticName);
        } else if (phStatic.includes('fiscal') || phStatic.includes('fy') || phDisplay.includes('fiscal')) {
            columnsObj['Fiscal Year'].push(field.StaticName);
        } else if (phStatic.includes('archive') || phDisplay.includes('archive')) {
            columnsObj['Archive Date'].push(field.StaticName);
        }
    }
    const columns = [];
    const headersForColumns = [];
    for (let key in columnsObj) {
        for (let i = 0; i < columnsObj[key].length; i++) {
            headersForColumns.push(key);
        }
        columns.push(...columnsObj[key]);
    }
    const headers = ['Type', 'Name', ...headersForColumns, 'Created By', 'Modified By', 'Created', 'Last Modified',
        'URL', 'ID', 'Library', 'Library Location']
    return { columns, headers };
}

export function getType(name: string) {
    return name.split('.')[name.split('.').length - 1];
}