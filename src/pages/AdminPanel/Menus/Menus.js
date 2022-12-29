import React, { useEffect, useState } from "react";
import DataTable from "./../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

export default function Menus() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    getAllMenus();
  }, []);

  // function getAllMenus() {
  //   fetch("http://localhost:4000/v1/menus/all")
  //     .then((res) => res.json())
  //     .then((allMenus) => setMenus(allMenus));
  // }


  // function getAllMenus(){
  //   fetch("http://localhost:4000/v1/menus/all")
  // .then((res)=>res.json())
  //  .then((allMenus)=>setMenus(allMenus))
  // }

  function getAllMenus(){

    fetch("http://localhost:4000/v1/menus")
    .then((res)=>res.json())
    .then((allMenus)=>setMenus(allMenus))
  }
  function allMenus(){
    fetch("http://localhost:4000/v1/menus")
    .then((res)=>res.json())
    .then((allMenus)=>setMenus(allMenus))
  }

  // const removeMenu = (menuID) => {
  //   swal({
  //     title: "آیا از حذف منو اطمینان دارید؟",
  //     icon: "warning",
  //     buttons: ["نه", "آره"],
  //   }).then((result) => {
  //     if (result) {
  //       fetch(`http://localhost:4000/v1/menus/${menuID}`, {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${
  //             JSON.parse(localStorage.getItem("user")).token
  //           }`,
  //         },
  //       }).then((res) => {
  //         if (res.ok) {
  //           swal({
  //             title: "منوی مورد نظر با موفقیت حذف شد",
  //             icon: "success",
  //             buttons: "اوکی",
  //           }).then(() => {
  //             getAllMenus();
  //           });
  //         }
  //       });
  //     }
  //   });
  // };
const removeMenu =(menuID)=>{
    swal({
        title: "آیا از حذف منوی خود مطمن هستید",
        icon: "warning",
        buttons: ["no ", "yes"],
    }).then((result) => {
        if (result) {
            fetch(`http://localhost:4000/v1/menus/${menuID}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("user")).token
                    }`,
                },
            }).then((res) => {
                if (res.ok) {
                    swal({
                        title: "منوی مورد نظر با موفقیت حذف شد",
                        icon: "success",
                        buttons: "اوکی",
                    }).then(() => {
                        getAllMenus();
                    });
                }
            });
        }
    });
}

  return (
    <>
      <DataTable title="منوها">
        <table class="table">
          <thead>
            
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مقصد</th>
              <th>فرزند ...</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
           

         
              
              <tr>
                <td>{index + 1}</td>
                <td>{menu.title}</td>
                <td>{menu.href}</td>
                <td>
                  {menu.parent ? (
                    menu.parent.title
                  ) : (
                    <i className="fa fa-user"></i>
                  )}
                </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    // onClick={() => removeMenu(menu._id)}
                    onClick={()=>removeMenu(menu._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
