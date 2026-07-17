import {Link} from "react-router-dom"

function Header2() {
    return (
        < div className="flex justify-between items-center" style={{ margin: "30px" }}>
            <h3 >Paperplane</h3>
            <ul className="flex gap-5">
                <li className="active">Explore</li>
                <li>Journal</li>
                <li>Poetry</li>
                <li>code</li>
            </ul>
            <Link to="/Blog">+</Link>
            <div className="bg-yellow-500 w-10 h-10 rounded-full">
            </div>

        </div >
    )
}
export default Header2;