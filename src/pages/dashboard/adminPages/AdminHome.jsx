import useAuth from "../../../hooks/useAuth";

const AdminHome = () => {
    const { user } = useAuth();
    return (
        <div>
            <h2>Hi, Welcome {user?.displayName || "Admin"}</h2>
        </div>
    );
};

export default AdminHome;