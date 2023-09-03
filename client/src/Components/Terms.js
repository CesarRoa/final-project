import { styled } from 'styled-components';
import React from 'react'

const Terms = ({setVisible}) => {
    const date = new Date()
    const dateOption = {year: 'numeric', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString(undefined, dateOption);

    return (
        <Wrapper 
        onClick={(e)=>{
            if (e.target === e.currentTarget){
                setVisible()
            }
        }}
        >
            <Div>
            <h2>Terms and Conditions for <span>BudgetYourself App</span></h2>
            <p>Last updated: {currentDate}</p>
            <section>
                <h3>
                    1. Acceptance of Terms
                </h3>
                <p>
                    By accessing and using the <span>BudgetYourself App</span>, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the app.
                </p>
            </section>
            <section>
                <h3>
                    2. Description of Service
                </h3>
                <p>
                    <span>BudgetYourself App</span> ("we", "our", or "us") provides a personal budget management tool. Users can input, track, and analyze their income and expenses.
                </p>
            </section>
            <section>
                <h3>
                    3. Registration
                </h3>
                <p>
                    To use certain features, users may be required to register. Users agree to provide accurate information and update as necessary.
                </p>
            </section>
            <section>
                <h3>
                    4. Data Privacy
                </h3>
                <p>
                    We respect the privacy of our users. Please refer to our Privacy Policy, which explains how we collect, use, and protect the information you provide.
                </p>
            </section>
            <section>
                <h3>
                    5. Restrictions
                </h3>
                <>
                    <p>
                        Users may not:
                    </p>
                    <ul>
                    <li>
                        🚫Use the app for any illegal activities.
                    </li>
                    <li>
                        🚫Attempt to hack, disrupt, or misuse the app services.
                    </li>
                    <li>
                        🚫Copy, distribute, or reproduce the app without permission.
                    </li>
                    </ul>
                </>
            </section>
            <section>
                <h3>
                    6. Termination
                </h3>
                <p>
                    We reserve the right to terminate or suspend user access without notice for non-compliance with these terms.
                </p>
            </section>
            <section>
                <h3>
                    7. Limitation of Liability
                </h3>
                <p>
                    <span>BudgetYourself App</span> is provided "as is". We do not guarantee that the app will be error-free or uninterrupted. We shall not be liable for any direct or indirect damages arising from the use or inability to use the app.
                </p>
            </section>
            <section>
                <h3>
                    8. Modifications
                </h3>
                <p>
                    We may update these Terms and Conditions periodically. The updated date at the top will change accordingly. Users are encouraged to review these terms frequently.
                </p>
            </section>
            <section>
                <h3>
                    9. Governing Law
                </h3>
                <p>
                    hese terms will be governed by and interpreted in accordance with the laws of Quebec, Canada, without regard to its conflict-of-law rules.
                </p>
            </section>
            <section>
                <h3>
                    10. Contact
                </h3>
                <p>
                    For any questions regarding these terms, please contact us at <a href='https://github.com/CesarRoa' target='_blank' rel="noopener noreferrer">Contact</a>.
                </p>
            </section>
            </Div>
        </Wrapper>
    );
}

export default Terms

const Wrapper = styled.div`
position: fixed;
z-index: 150;
left: 0;
top: 0;
background-color: rgba(0,0,0,0.4);
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
span{
font-size: 15px;
font-weight: bold;
font-style: italic;
color: #4B0082;
}
h2 {
text-align: center;
color: #333;
}
h3 {
margin-top: 10px;
color: #444;
}
p {
margin: 5px 0;
color: #555;
}
`
const Div = styled.div`
font-size: 14px;
max-width:900px;
margin: 0 auto;
padding: 10px;
background-color: #f5f5f5;
border-radius: 8px;
`