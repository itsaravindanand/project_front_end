import { useRef, useState, useEffect } from "react";
import axios from '../api/axios';

const LOGIN_ENDPOINT = 'http://localhost:8080/user/createuser';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const CreateUser = () => {
    const userRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const pwdRef = useRef();
    const userTypeRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [userType, setUserType] = useState('');
    const [matchPwd, setMatchPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [validUser, setValidUser] = useState(false);
    const [validFirstName, setValidFirstName] = useState(false);
    const [validLastName, setValidLastName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [validMatch, setValidMatch] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidUser(USER_REGEX.test(user));
        setValidFirstName(firstName.length > 0);
        setValidLastName(lastName.length > 0);
        setValidEmail(EMAIL_REGEX.test(email));
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
        setErrMsg('');
    }, [user, firstName, lastName, email, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validForm = validUser && validFirstName && validLastName && validEmail && validPwd && validMatch && userType;
        if (!validForm) {
            setErrMsg("Invalid Entry");
            errRef.current.focus();
            return;
        }
    
        const userData = {
            username: user,
            firstName: firstName,
            lastName: lastName,
            emailId: email,
            password: pwd,
            userType: userType.toUpperCase()
        };
    
        try {
            const response = await axios.post(LOGIN_ENDPOINT, JSON.stringify(userData), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
    
            console.log(response + 'user created successfully'); // Debugging line to check the response object
    
            if (response.status === 200) { // Assuming OK status is 200
                setErrMsg("User Created Successfully!");
                setTimeout(() => {
                    // Clearing the fields after showing the success message
                    setUser('');
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setPwd('');
                    setMatchPwd('');
                    setUserType('');
                    setErrMsg(''); // Optionally clear the message after a delay
                }, 3000); // Delay in milliseconds
    
                // Optionally redirect the user or update state to show a successful registration
            } else {
                throw new Error('Unexpected response status: ' + response.status);
            }
        } catch (err) {
            console.error(err); // Debugging line to check the error
    
            if (!err.response) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 409) {
                setErrMsg(err.response.data); // Display custom message from the server
            } else {
                setErrMsg('Registration Failed, Try Later');
            }
            errRef.current.focus();
        }
    };
    

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" ref={userRef} onChange={(e) => setUser(e.target.value)} value={user} required aria-invalid={!validUser} style={{ borderColor: validUser ? 'green' : 'red' }}/>
                    <span className="instructions">4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.</span>
                </div>
                <div className="input-group">
                    <label htmlFor="firstname">Firstname:</label>
                    <input type="text" id="firstname" ref={firstNameRef} onChange={(e) => setFirstName(e.target.value)} value={firstName} required aria-invalid={!validFirstName} style={{ borderColor: validFirstName ? 'green' : 'red' }}/>
                </div>
                <div className="input-group">
                    <label htmlFor="lastname">Lastname:</label>
                    <input type="text" id="lastname" ref={lastNameRef} onChange={(e) => setLastName(e.target.value)} value={lastName} required aria-invalid={!validLastName} style={{ borderColor: validLastName ? 'green' : 'red' }}/>
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" ref={emailRef} onChange={(e) => setEmail(e.target.value)} value={email} required aria-invalid={!validEmail} style={{ borderColor: validEmail ? 'green' : 'red' }}/>
                    <span className="instructions">Enter a valid email address.</span>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" ref={pwdRef} onChange={(e) => setPwd(e.target.value)} value={pwd} required aria-invalid={!validPwd} style={{ borderColor: validPwd ? 'green' : 'red' }}/>
                    <span className="instructions">8 to 24 characters. Must include uppercase and lowercase letters, a number, and a special character. Allowed special characters: ! @ # $ %</span>
                </div>
                <div className="input-group">
                    <label htmlFor="confirm_pwd">Confirm Password:</label>
                    <input type="password" id="confirm_pwd" onChange={(e) => setMatchPwd(e.target.value)} value={matchPwd} required aria-invalid={!validMatch} style={{ borderColor: validMatch ? 'green' : 'red' }}/>
                </div>
                <div className="input-group">
                    <label htmlFor="userType">User Type:</label>
                    <select id="userType" ref={userTypeRef} onChange={(e) => setUserType(e.target.value)} value={userType} required>
                        <option value="">Select User Type</option>
                        <option value="tester">Tester</option>
                        <option value="developer">Developer</option>
                        <option value="manager">Manager</option>
                    </select>
                </div>
                <button type="submit" disabled={!validUser || !validFirstName || !validLastName || !validEmail || !validPwd || !validMatch || !userType}>Sign Up</button>
            </form>                    
        </section>
    );
};

export default CreateUser;
