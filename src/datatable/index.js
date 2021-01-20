import React, { Component } from "react";
import ReactPaginate from 'react-paginate';
import '../index.css';

class Datatable extends Component {
    constructor(props){
        super(props)

        this.state = {
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 10,
            currentPage: 0
        }

        this.handlePageClick = this.handlePageClick.bind(this)
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage

        this.setState({
            currentPage: selectedPage,
            offset
        }, () => {
            this.loadMoreData()
        })
    }


    loadMoreData(){
        const data = this.state.orgtableData

        var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            tableData: slice
        })        
    }
    

    componentDidMount(){
        this.makePage()
    }

    makePage(){
        const data = this.props.data
        var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            orgtableData: data,
            tableData: slice
        })
    }

     render(){
        const data = this.state.tableData
        const columns = data[0] && Object.keys(data[0])

        return (
            <div>
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

                <ReactPaginate 
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                />
            </div>
            )
     }
}export default Datatable;