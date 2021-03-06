import React from 'react';
import {compose} from 'recompose';
import {withRouter} from "react-router-dom";
import withActions from '../../hoc/withActions';
import withHttp from '../../hoc/withHttp';
import httpNormalizeResponseBody from '../../util/httpNormalizeResponseBody';
import {Field} from 'redux-form';
import Form from '../../components/Form';
import TextField from '../../components/forms/TextField';
import {SaveButton} from '../../components/ActionButton';
import withProfile from '../../hoc/contents/withProfile';
import wpUrl from '../../util/wpUrl';

const textFields = edit => ([
    {id: 'first_name', label: 'First Name', defaultValue: edit.first_name},
    {id: 'last_name', label: 'Last Name', defaultValue: edit.last_name},
    {id: 'nickname', label: 'Nickname', defaultValue: edit.nickname},
    {id: 'name', label: 'Display Name', defaultValue: edit.name},
    {id: 'email', label: 'email', defaultValue: edit.email},
]);

class Edit extends React.Component{

    componentWillMount(){

        const {http, profile} = this.props;

        profile.bind(this);

        http('_profile', {
            url: wpUrl().path('users/me').query({context: 'edit'}).url,
            method: 'GET',
            isProtected: true
        });

    }

    render(){

        const {httpGetResponse} = this.props;

        var edit = {}

        try{
            edit = httpNormalizeResponseBody(httpGetResponse('_profile'))[0];
        }catch(err){
            return null;
        }
   
        return (<div>

           <Form form='_profile' onSubmit={this.profile.handleSubmit}>

             {textFields(edit).map( (v,k) => {
                 return <Field component={TextField} key={k} id={v.id} name={v.id} label={v.label} defaultValue={v.defaultValue} />
             })}
    
            <SaveButton style={{marginLeft: 0}} />
          </Form>
        </div>);
    }

}

export default compose(
    withRouter,
    withActions(), 
    withProfile({namespace: 'profile'}),
    withHttp(),
)(Edit);


