import { styled } from "styled-components";
const Profile = ({data}) =>{
    const profile = data.profile
    return(
    <>
        <h1>Profile</h1>
        <p>Welcome {profile.username}!</p>
        <p>Member since: {profile.memberSince}</p>
        <p>Name: {profile.name}</p>
        <p>e-mail: {profile.email}</p>
    </>
)
};

export default Profile;

const Div = styled.div`
/* height:300px;
width : 30%; */
border: purple solid 1px;
`