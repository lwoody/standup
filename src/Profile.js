import React from 'react';
import './Profile.css';
import Anonymous from './img/anonymous.png';

const Profile = isAnonymous => {
    console.log(isAnonymous);
    if(isAnonymous){
        return(
            <div className="anonymous">
                <div className="today_title">
                    share contents
                </div>
                <div className="anonymous_name">
                    woody
                </div>
                <div className="anonymous_img_wrap">
                    <img src = {Anonymous} alt="profiles" className="anonymous_img"/>
                </div>
            </div>
        )
    } else {
        return <div/>
    }
}

export default Profile;