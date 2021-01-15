import React, { Component } from "react";

 class Datatable extends Component {
     render(){
        const data = this.props.data
        const columns = data[0] && Object.keys(data[0])

        return (
            <table className="table table-bordered table-hover table-responsive" cellPadding={0} cellSpacing={0}>
                <thead className="thead-dark">
                    <tr>{data[0] && columns.map(heading => <th scope="col">{heading}</th>)}</tr>
                </thead>
                <tbody>
                    {data.map(row =>  <tr>
                        {
                            columns.map(column => <td scope="row">{row[column]}</td>)
                        }
                    </tr>)}
                </tbody>
            </table>
            )
     }
}export default Datatable;