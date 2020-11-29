import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";
import Checkbox from '@material-ui/core/Checkbox';
import fire from "../login/config/Fire";

const Container = styled.div`
    width:600px;
    height: 400px;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    text-align: center;
`;

const FieldsContainer = styled.div`
    width:400px;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    text-align: center;
    width: 50%;
    margin: 0 auto;
    padding : 10px
`;

class MentorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            mentor: {},
        }
    }

    componentDidMount() {
        console.log((localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid))
        let uid = (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid)
        dbFetch.get({
            endpoint: "/getUserChecksheet/" + uid,
            data: {}
        })
            .then(response => response.json())
            .then((data) => {

                this.setState({
                    isLoaded: true,
                    mentor: data
                });

            })
            .catch((error) => {
                console.error("Failed to fetch mentor data: " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });


    }

    render() {
        return (
            <Container>
                <img
                    src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
                    alt="new"
                    style={{ borderRadius: 200, height: 150, width: 150, boxShadow: 10, padding: 10 }}
                />

                <h2
                style={{margin: 20}}>{this.state.mentor.firstName + " " + this.state.mentor.lastName}</h2>
                <FieldsContainer>
                <h5>{"Occupation: " + this.state.mentor.occupation}</h5>
                <h5>{"Organization: " + this.state.mentor.organizationName}</h5>
                <h5>{"My Bio: " + this.state.mentor.description}</h5>
                <h5 style = {{display : "inline-block"}}>{"VT Alumni: "}</h5>
                <Checkbox checked={this.state.mentor.vtAlumni || false}/>
                </FieldsContainer>
            </Container>
        );
    }

}

export default MentorProfile;