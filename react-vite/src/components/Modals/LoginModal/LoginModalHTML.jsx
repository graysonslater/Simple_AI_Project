import CustomModal from "../../../context/CustomModal";

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
                        <form onSubmit={handleLogin}>
                            <label>
                            Email
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                required
                            />
                            </label>
                            {errors.password && <p>{errors.password}</p>}
                            <button type="submit">Log In</button>
                        </form>
                        <button className="loginDemo" onClick={demoLoginHandler}>Login in as Demo User</button>     
                    </CustomModal>
                )}
            </div>
        );
    };