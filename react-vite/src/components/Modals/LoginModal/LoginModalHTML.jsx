import CustomModal from "../../../context/CustomModal";
import "./LoginModal.css";

export const LoginModalHTML = ({
        showLogin,
        loginToggle,
        handleLogin,
        email,
        setEmail,
        password,
        setPassword,
        errors,
        demoLoginHandler
    }) => { 
        return (
            <div className="LoginButton">
                {showLogin && (
                    <CustomModal onClose={(e) => loginToggle(e)}>
                        <div className="LoginModalContent">
                            <h1>Login</h1>
                            <form onSubmit={handleLogin}>
                                <label>
                                    Email
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </label>
                                {errors.email && <p>{errors.email}</p>}
                                <label>
                                    Password
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                    />
                                </label>
                                {errors.password && <p>{errors.password}</p>}
                                <button type="submit">Log In</button>
                            </form>
                            <div className="buttonContainer">
                                <button className="loginDemo" onClick={demoLoginHandler}>Login as Demo User</button>     
                            </div>
                        </div>
                    </CustomModal>
                )}
            </div>
        );
    };