import { styled } from "styled-components";

const Search = () =>{
    return(
    <Div>
        <Form
        
        >
            <div>
                <label>Add a user:</label>
                <select>
                    <option>by username</option>
                    <option>by phone</option>
                </select>
                <input></input>
                <button>Search</button>
            </div>
        </Form>
    </Div>
)
};

export default Search;

const Div = styled.div`
`

const Form = styled.form`
`