function showList() {
  const recommend = document.getElementById("movie-recommend");
  const m_list = document.getElementById("movie-list");
  if (recommend.style.display == "none") {
    recommend.style.display = "block";
    m_list.style.display = "none";
  } else {
    recommend.style.display = "none";
    m_list.style.display = "flex";
  }
}

// function showDetail() {
//   const m_detail = document.getElementById("movie-detail");
//   const m_list = document.getElementById("movie-list");

//   if (m_detail.style.display == "none") {
//     m_detail.style.display = "block";
//     m_list.style.display = "none";
//   } else {
//     m_detail.style.display = "none";
//     m_list.style.display = "flex";
//   }
// }
