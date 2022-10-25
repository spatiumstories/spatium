import { useParams } from "react-router";
import SpatiumReader from "../components/Reader/SpatiumReader";

const ReaderPage = () => {
    let { book } = useParams();
    return (
        <SpatiumReader book={book}/>
    );
};

export default ReaderPage;