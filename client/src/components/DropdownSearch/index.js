import React, {Component} from 'react'
import {render} from 'react-dom'
import Downshift from 'downshift'
import './style.css'
import {Link} from "react-router-dom"

// const items = [
//     {value: 'apple'},
//     {value: 'pear'},
//     {value: 'orange'},
//     {value: 'grape'},
//     {value: 'banana'},
//   ]

class DropdownSearch extends Component {
//   static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
       items: []
 
    };

  }



  fetchAllReviews = () => {
    fetch(`/api/tests`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.length > 0) {
          // console.log("we have length")
          console.log("all tests")
          this.setState({
            items: json,
          });
        } else {
          this.setState({
            items: [],
          });
        }
      });
  };

  componentDidMount() {
 this.fetchAllReviews()
  }

  render() {

    const {items} = this.state;

if (items) {

    // console.log(items)


    return (
        <Downshift
        className="dropdown"
        onChange={selection => alert(`You selected ${selection.value}`)}
        itemToString={item => (item ? item.abbrev.toLowerCase() : '')}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => (
          <div>
            {/* <label {...getLabelProps()}>Search By Abbreviation</label> */}
            <input {...getInputProps()} placeholder="Search" />
            <ul {...getMenuProps()}>
              {isOpen
                ? items
                    .filter(item => !inputValue || item.abbrev !== null && item.abbrev.toLowerCase().includes(inputValue.toLowerCase()) || item.title.toLowerCase().includes(inputValue.toLowerCase()))
                    .map((item, index) => (
                        <div>
                      <Link to={`/tests/${item.uuid}`}>
                          <li className="search-item"
                        {...getItemProps({
                            key: item.abbrev,
                            index,
                            item,
                            style: {
                                listStyle:'none',
                                backgroundColor:
                              highlightedIndex === index ? 'lightgray' : 'white',
                              fontWeight: selectedItem === item ? 'bold' : 'normal',
                            },
                        })}
                      >
                        {item.abbrev}
                      </li>
                        <li style={ {
                              listStyle:'none',
                              backgroundColor:
                                highlightedIndex === index ? 'lightgray' : 'white',
                              fontWeight: selectedItem === item ? 'bold' : 'normal',
                            }}>
                            {item.title}</li>
                      </Link>
                      </div>
                    ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    );
                    }
  }
}
export default DropdownSearch;
