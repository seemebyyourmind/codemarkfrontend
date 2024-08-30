import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { roles } from '../../../assets/ults';
import {getUserInfo} from '../../../services/admin/UserApi'
const Info=()=>
{

    const { id } = useParams(); // Lấy tham số id từ URL
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
      
    fetchUser();
     
      }, [id]); // Chạy effect khi id thay đổi
const fetchUser=async()=>{
    try {
        const user=await getUserInfo(id)
        setUserInfo(user.user[0])
    } catch (error) {
       setError(error)
    } finally{
setLoading(false)
    }
  
}

      if (loading) return <p>Loading...</p>; // Hiển thị thông báo tải dữ liệu
      if (error) return <p>Error: {error.message}</p>; // Hiển thị thông báo lỗi
    return <div>
      <h1>Thông Tin Người Dùng</h1>
      {userInfo ? (
        <div>
          <p><strong>ID:</strong> {userInfo.user_id}</p>
          <p><strong>Username:</strong> {userInfo.username}</p>
          <p><strong>Phone:</strong> {userInfo.phone}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Role:</strong> {roles[+userInfo.role_id-1]}</p>
          <p><strong>Date:</strong> {new Date(userInfo.date).toLocaleDateString()}</p>
          {/* Thêm các trường khác nếu cần */}
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
    
}
export default Info