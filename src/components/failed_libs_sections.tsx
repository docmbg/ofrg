import * as React from 'react';

export default class FailedLibs extends React.PureComponent<any, any>{
    render() {
        const libs = this.props.libs;
        return (
            <table>
                <th>

                </th>
                <th>
                    Site
                </th>
                <th>
                    Library
                </th>
                {
                    Object.keys(libs).map((lib: any) => {
                        if (lib !== 'show') {
                            return (
                                <tr>
                                    <td>{lib}</td>
                                    <td>
                                        {
                                            libs[lib].map((item: any) => <p>{item[`Title`]}</p>)
                                        }
                                    </td>
                                    <td>
                                        {
                                            libs[lib].map((item: any) => <p>{item[`Site`]}</p>)
                                        }
                                    </td>
                                </tr>
                            )
                        }else {
                            return <></>
                        }
                    })
                }
            </table>
        )
    }
}