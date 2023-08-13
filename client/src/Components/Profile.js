import { styled } from "styled-components";
const Profile = ({data}) =>{
    const profile = data.profile
    return(
    <Div>
        <p>Welcome {profile.username}!</p>
        <p>Member since: {profile.memberSince}</p>
        <p>Name: {profile.name}</p>
        <p>E-mail: {profile.email}</p>
    </Div>
)
};

export default Profile;

const Div = styled.div`
/* height:300px;
width : 30%; */
border: purple dashed 1px;
&>*{
    margin-bottom:5px;
}
`