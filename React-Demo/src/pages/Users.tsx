import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserObject } from "../interfaces/user";
import "bootstrap/dist/css/bootstrap.min.css";

const Users = () => {
    const [users, setUsers] = useState<UserObject[]>([]);

    const getAllUsers = async () => {
        try {
            const response = await axios.get("https://reqres.in/api/users/");
            if (response.status === 200) {
                setUsers(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div id='users'>
            <h1 className='heading'>Users Are Here</h1>
            {users.length > 0 ? (
                <div id='users_section' className='row mb-3'>
                    {users.map((user) => (
                        <div key={user.id} className='user_preview col-xl-3 col-lg-4 col-md-4 col-sm-6'>
                            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                            <Link to={`/user/${user.id}`}>{user.first_name} {user.last_name}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path d="M572.5 241.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400a144 144 0 1 1 144-144 143.9 143.9 0 0 1 -144 144zm0-240a95.3 95.3 0 0 0 -25.3 3.8 47.9 47.9 0 0 1 -66.9 66.9A95.8 95.8 0 1 0 288 160z"/>
                                </svg>
                            </Link>
                            <h5>{user.email}</h5>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='loading'>Loading...</p>
            )}
        </div>
    );
};

export default Users;