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
                        <div className="SignUpModalContent">
                            <h1>Sign Up</h1>
                            {errors.server && <p>{errors.server}</p>}
                            <form onSubmit={handleSubmit}>
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
                                    Username
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Choose a username"
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
                                        placeholder="Create a password"
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
                                        placeholder="Confirm your password"
                                        required
                                    />
                                </label>
                                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                                <button type="submit">Sign Up</button>
                            </form>   
                        </div>
                    </CustomModal>
                )}
            </div>
        );
    };