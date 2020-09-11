import React, { Component } from 'react'
import { Index } from 'elasticlunr'
import SearchDisplay from "./searchdisplay"

export default class SearchBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ``,
            results: [],
            isActive: false,
        }
    }

    render() {
        return (
            <div className="relative">
                <div className="flex flex-col sm:flex-row">
                    <div className="flex flex-1 relative p-3 bg-white my-1 sm:my-0">
                        <div className="text-gray-600 mx-3 text-2xl rounded inline-flex items-center">
                            <svg className="fill-current w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="gray" d="M19.129,18.164l-4.518-4.52c1.152-1.373,1.852-3.143,1.852-5.077c0-4.361-3.535-7.896-7.896-7.896 c-4.361,0-7.896,3.535-7.896,7.896s3.535,7.896,7.896,7.896c1.934,0,3.705-0.698,5.078-1.853l4.52,4.519 c0.266,0.268,0.699,0.268,0.965,0C19.396,18.863,19.396,18.431,19.129,18.164z M8.567,15.028c-3.568,0-6.461-2.893-6.461-6.461 s2.893-6.461,6.461-6.461c3.568,0,6.46,2.893,6.46,6.461S12.135,15.028,8.567,15.028z" />
                            </svg>
                        </div>
                        <div className="flex flex-1">
                            <input
                                className='w-full text-black outline-none'
                                type='text'
                                aria-label="Search box"
                                value={this.state.query}
                                onChange={this.search}
                                placeholder="I'm looking for..."
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 rounded-none px-6 py-2 my-1 sm:my-0 overflow-hidden">
                        <span className="text-white">GO</span>
                    </button>
                </div>

                {this.state.isActive ?
                    <div className="absolute w-full bg-white shadow-md rounded border border-gray-300 mt-1">
                        {this.state.results.map(page => (
                            <SearchDisplay key={page.id} props={page} />
                        ))}
                    </div>
                    : ''}
            </div>
        )
    }

    getOrCreateIndex = () => this.index
        ? this.index
        : Index.load(this.props.searchIndex)

    search = evt => {
        const query = evt.target.value
        this.index = this.getOrCreateIndex()
        this.setState({
            query,
            // Query the index with search string to get an [] of IDs
            results: this.index
                .search(query, { expand: true }) // Accept partial matches
                // Map over each ID and return the full document
                .map(({ ref }) => {
                    let result = this.index.documentStore.getDoc(ref)
                    //console.log("result:", result)
                    if (result.type === 'reviews') {
                        const company = this.index.documentStore.getDoc(result.company)
                        //console.log("company:", company)
                        result = {
                            ...result,
                            slug: company.slug
                        }
                    }
                    //console.log("result:", result)
                    return result
                }),
            isActive: !!query,
        })
    }
}