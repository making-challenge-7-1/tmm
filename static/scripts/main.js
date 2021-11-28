function showList() {
  const recommend = document.getElementById('movie-recommend');
  const mlist = document.getElementById('movie-list');

  if(recommend.style.display === 'none')  {
    recommend.style.display = 'block';
    mlist.style.display = 'none';
  }else {
    recommend.style.display = 'none';
    mlist.style.display = 'flex';
  }
} 