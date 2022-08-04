import classes from "./Blog.module.css";

const Signup = () => {
    return (
        <div className={classes.signup}>
            <p>Subscribe for first looks!</p>
            <iframe title="signup" src="https://spatiumstories.substack.com/embed"></iframe>
        </div>
    );
};

export default Signup;