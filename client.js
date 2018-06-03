$('.search-box').keyup((e) => {
  $.get('/api', { keyword: $(e.target).val() }).done(producers => {
    drawProducerList(producers)
  })
})

function drawProducerList (producers) {
  $('.autocomplete-search-box .search-result').html('')
  for (let i = 0; i < producers.length; i++) {
    $('.autocomplete-search-box .search-result').append(`<li>${producers[i]}</li>`)
  }
}
