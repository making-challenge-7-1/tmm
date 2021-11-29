function showList() {
  const recommend = document.getElementById('movie-recommend');
  const m_list = document.getElementById('movie-list');

  if(recommend.style.display === 'none')  {
    recommend.style.display = 'block';
    m_list.style.display = 'none';
  }else {
    recommend.style.display = 'none';
    m_list.style.display = 'flex';
  }
} 