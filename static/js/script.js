document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startBtn')
  const intro = document.getElementById('intro')
  const mainContent = document.getElementById('mainContent')
  const lineElement = document.getElementById('line')
  const bgMusic = document.getElementById('bgMusic')
  const btnNo = document.getElementById('btnNo')

  const lines = [
    'Từ lần đầu gặp cậu, tớ đã biết tim mình không ổn.',
    'Mỗi tin nhắn từ cậu làm tim tớ rung lên từng nhịp.',
    'Tớ đã nghĩ mãi… liệu có nên nói điều này không.',
    'Nhưng nếu không nói thì sẽ tiếc cả đời.',
    'Nên hôm nay, tớ quyết định nói ra...',
    'Tớ thích cậu!',
    'Không phải là thích thoáng qua, mà là thật lòng đấy.',
    'Tớ không mong gì nhiều, chỉ mong được ở bên cạnh cậu, làm cậu cười mỗi ngày.',
    'Nếu cậu cho phép, tớ sẽ chăm sóc và lắng nghe cậu thật nhiều.',
    'Tớ muốn cùng cậu viết tiếp câu chuyện này, từng dòng, từng chương...',
    'Cậu có đồng ý làm chương đầu tiên cùng tớ không?',
    'Tớ biết tình cảm không thể ép buộc, nhưng tớ muốn cho cậu biết tớ nghiêm túc đến nhường nào.',
    'Cậu là lý do khiến mỗi ngày của tớ trở nên đặc biệt hơn.',
    'Chỉ cần một cái gật đầu từ cậu, tớ sẽ nắm tay cậu thật chặt và không buông.',
    'Tớ không hoàn hảo, nhưng tớ thật lòng.',
    'Nếu cậu cho tớ cơ hội, tớ sẽ biến mỗi ngày bên cậu thành một ngày đáng nhớ.',
    'Và nếu cậu cũng có chút rung động giống tớ...',
    'Thì... mình bắt đầu một chuyện tình nhé?'
  ]

  let currentLine = 0

  startButton.addEventListener('click', () => {
    intro.style.display = 'none'
    mainContent.style.display = 'block'
    playBackgroundMusic()
    showLine(lines[currentLine])
  })

  function playBackgroundMusic () {
    bgMusic.play().catch(error => {
      console.error('Lỗi phát nhạc:', error)
    })
  }

  function showLine (text) {
    lineElement.innerHTML = ''
    let charIndex = 0

    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        lineElement.innerHTML += text.charAt(charIndex)
        charIndex++
      } else {
        clearInterval(typingInterval)
        setTimeout(
          () =>
            fadeOutCurrentLine(() => {
              currentLine++
              if (currentLine < lines.length) {
                showLine(lines[currentLine])
              } else {
                document.getElementById('final').classList.add('active') 
              }
            }),
          850
        )
      }
    }, 70)
  }

  function fadeOutCurrentLine (callback) {
    lineElement.style.transition = 'opacity 1s ease'
    lineElement.style.opacity = '0'
    setTimeout(() => {
      lineElement.innerHTML = ''
      lineElement.style.opacity = '1'
      lineElement.style.transition = ''
      callback()
    }, 1000)
  }

  document.getElementById('btnYes').addEventListener('click', () => {
    FuiToast.success('Cảm ơn cậu đã đồng ý!')

    document.querySelector('.final').classList.remove('active')
    document.querySelector('.yesContent').classList.add('active')
  })

  btnNo.addEventListener('mouseover', () => {
    const maxX = window.innerWidth - btnNo.offsetWidth
    const maxY = window.innerHeight - btnNo.offsetHeight
    btnNo.style.position = 'absolute'
    btnNo.style.left = `${Math.random() * maxX}px`
    btnNo.style.top = `${Math.random() * maxY}px`
  })

  btnNo.addEventListener('click', () => {
    FuiToast.error('Thôi mà, bấm lại nút `Đồng ý` nhaaa~')
  })
})