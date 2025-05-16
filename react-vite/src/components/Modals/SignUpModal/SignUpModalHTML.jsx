import CustomModal from "../../../context/CustomModal";
import './SignUpModal.css';


export const SignUpModalHTML = ({
        showSignup,
        signupToggle,
        handleSubmit,
        email,
        setEmail,
        username,
        setUsername,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        errors
    }) => { 
        return (
            <div className="SignUpform">
                {showSignup && (
                    <CustomModal onClose={(e) => signupToggle(e)}>
                        <h1>Sign Up</h1>
                        {errors.server && <p>{errors.server}</p>}
                        <form onSubmit={handleSubmit}>
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
                                Username
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </label>
                            {errors.username && <p>{errors.username}</p>}
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
                            <label>
                                Confirm Password
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </label>
                            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                            <button type="submit">Sign Up</button>
                        </form>   
                    </CustomModal>
                )}
            </div>
        );
    };