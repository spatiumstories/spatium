import classes from "./Blog.module.css";

const Signup = () => {
    return (
        <div>
            <h3>Subscribe for first looks</h3>
            <iframe className={classes['signup']} title="signup" src="https://spatiumstories.substack.com/embed"></iframe>
        </div>
    );
};

export default Signup;