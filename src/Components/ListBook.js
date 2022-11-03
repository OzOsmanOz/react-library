import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const ListBook = () => {
  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState(null);
  const [update, setUpdate] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3004/books").then((resBook) => {
      // console.log(resBook);
      setTimeout(() => {
        setBooks(resBook.data);
      }, 300);
      // console.log(books);
    });
    axios
      .get("http://localhost:3004/categories")
      .then((resCat) => {
        console.log("Categories", resCat);
        setCategories(resCat.data);
      })
      .catch((err) => console.log("CategoriesErr", err))
      .catch((err) => console.log("BooksErr", err));
  }, [update]);

  const deleteBook = (id) => {
    // console.log(`http://localhost:3004/books/${id}`);
    axios
      .delete(`http://localhost:3004/books/${id}`)
      .then((resDel) => {
        // console.log("resDel", resDel);
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  if (books === null) {
    return <Loading />;
  }
  return (
    <div className="list-books container my-5 ">
      <div className="d-flex justify-content-end my-3">
        <Link
          to="/add-book"
          className="btn btn-sm text-white"
          style={{ backgroundColor: "#256D85", color: "#DFF6FF" }}
        >
          Kitap Ekle
        </Link>
      </div>
      <table className="table">
        <thead style={{ color: "#06283D", fontSize: "16px" }}>
          <tr>
            <th className="text-center" scope="col">
              #
            </th>
            <th scope="col">Kitap Adı</th>
            <th scope="col">Yazar Adı</th>
            <th scope="col">Kategori</th>
            <th className="text-center" scope="col">
              İsbn
            </th>
            <th scope="col">Yayınevi</th>
            <th className="text-center" scope="col">
              İşlem
            </th>
          </tr>
        </thead>
        <tbody style={{ color: "#256D85", fontSize: "13px" }}>
          {books.map((book) => {
            const category = categories.find(
              (cat) => cat.id === book.categoryId
            );
            return (
              <tr key={book.id}>
                <th>
                  <img style={{ width: "30px" }} src={book.image} />
                </th>
                <th style={{ fontWeight: "600" }}>{book.name}</th>
                <td>{book.author}</td>
                <td>{category.name}</td>
                <td className="text-center">{book.isbn}</td>
                <td>{book.publisher}</td>
                <td>
                  <div className="d-flex">
                    <button
                      onClick={() => deleteBook(book.id)}
                      className="btn btn-sm btn-danger me-1"
                    >
                      Sil
                    </button>
                    <Link
                      to={`/edit-book/${book.id}`}
                      style={{
                        color: "#DFF6FF",
                        fontSize: "13px",
                        backgroundColor: "#256D85",
                      }}
                      className="btn btn-sm btn-primary"
                    >
                      Güncelle
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ListBook;
