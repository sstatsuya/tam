const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);




var musicPlayer = {
    // Declare
    // disc
    disc : $('.music__disc-img'),
    discWrapper : $('.music__disc-wrapper'),
    discRotate : $('.disc-rotate'),
    discRotate2 : $('.disc-rotate2'),
    discOverlay : $('.music__disc-overlay-btn'),
    discPause : $('.music__disc-overlay-btn-icon'),
    discPlay : $('.music__disc-play'),

    playBtn : $('.music__play-btn'),
    playText : $('.music__play-btn-text'),
    playIcon : $('.music__play-icon-play'),
    pauseIcon : $('.music__play-icon-pause'),

    musicBigName : $('.music__info-name'),

    // player
    playerDiscImg : $('.player__disc-img'),
    playerNameTitle : $('.player__name-title'),
    playerNameSinger : $('.player__name-singer'),
    playerPlayBtn : $('.player__center-play-btn.player__center-btn'),
    playerIconPause : $('.player__center-icon-pause'),
    playerIconPlay : $('.player__center-icon-play'),
    currentTime : $('.player__center-current-time'),
    remainingTime : $('.player__center-remaining-time'),
    processBar : $('.player__center-progress-input'),
    mixBtn : $('.player__center-random-btn.player__center-btn'),
    mixBtnIcon : $('.player__center-icon.player__center-icon-random') ,
    againBtn : $('.player__center-mix-btn.player__center-btn'),
    againBtnIcon : $('.player__center-icon.player__center-icon-loop'),
    prevBtn : $('.player__center-prev-btn.player__center-btn'),
    nextBtn : $('.player__center-next-btn.player__center-btn'),
    volumeBar : $('.player__footer-volume-progress-input'),
    muteBtn : $('.player__footer-volume-btn'),
    muteBtnLine : $('.player__footer-volume-btn-mute'),

    // system variable
    audio : $('#audio'),
    songItems : null,

    index : 1,
    isPlay : false,
    isRewinding : false,
    isMix : false,
    isAgain : false,
    volume : 0.5,
    isMute : false,

    //music list
    musics : [
        {
            name: 'The Fading Story',
            singer: 'Mihoyo',
            image: './Assets/music/poster0.png',
            src: 'https://drive.google.com/uc?export=download&id=1v5KGdlV9ADCgfyiM7BTSNQafx5qmCYkI',
            id: 0,
        },
        {
            name: 'Aishiteru',
            singer: 'Wotamin',
            image: './Assets/music/poster0.png',
            src: 'https://drive.google.com/uc?export=download&id=1SzXiSkaRBgAel79jtN9VnZ8nfnfdEt9m',
            id: 1,
        },
        {
            name: 'Anata no Negai Utau Mono',
            singer: 'Noname',
            image: './Assets/music/poster2.png',
            src: 'https://drive.google.com/uc?export=download&id=1ZB4XtHcyfNeZbUWGRILqOgRiTqBYWgQ0',
            id: 2,
        },
        {
            name: 'Matane ga areba',
            singer: 'Kashiwagi Rinko',
            image: './Assets/music/poster3.png',
            src: 'https://drive.google.com/uc?export=download&id=1EU5qjqFhrrdYAgEiyjimdjIpCZrbxItC',
            id: 3,
        },
        {
            name: 'Moonlike smile',
            singer: 'Mihoyo',
            image: './Assets/music/poster4.png',
            src: './Assets/music/song2.mp3',
            id: 4,
        },
        {
            name: 'Orion no Yume',
            singer: 'Kaori',
            image: './Assets/music/poster5.png',
            src: 'https://drive.google.com/uc?export=download&id=1ckQ2baiLhjjy8-kxwpHGeiuv1RHbGMi7',
            id: 5,
        },
        {
            name: 'Caelestinum Finale Termini',
            singer: 'Mihoyo',
            image: './Assets/music/poster6.png',
            src: './Assets/music/song4.mp3',
            id: 6,
        },
        {
            name: 'Snow-buries Tales',
            singer: 'Mihoyo',
            image: './Assets/music/poster7.png',
            src: './Assets/music/song5.mp3',
            id: 7,
        },
        {
            name: 'Yakusoku',
            singer: 'Noname',
            image: './Assets/music/poster8.png',
            src: 'https://drive.google.com/uc?export=download&id=13BTHc2LgtflRQBOboPVd-Wss0wvEzzot',
            id: 8,
        },
        {
            name: 'Tadaima Homu',
            singer: 'Hiragi Minami',
            image: './Assets/music/poster9.png',
            src: 'https://drive.google.com/uc?export=download&id=1deIWTqvuAq0o6d60FxEKZQFAoVtPgVna',
            id: 9,
        },
    ],

    allSongToView: function(){
        html = this.musics.map((music, i)=>{
            return `
            <li class="song-item" data-index=${music.id}>
            <div class="song-title">
                <i class="song-title__icon fas fa-music"></i>
                <div class="song-title__img-wrapper">
                    <img src="${music.image}" alt="song" class="song-title__img">
                    <i class="song-title__img-play-icon fas fa-play"></i>
                </div>
                <div class="song-title__info">
                    <span class="song-title__info-name">${music.name}</span>
                    <span class="song-title__info-author">${music.singer}</span>
                </div>
            </div>
            <div class="song-duration">No set</div>
            <div class="song-control">
                <div class="song-control__mic-btn song-control__btn">
                    <i class="song-control__mic-icon song-control__icon fas fa-microphone"></i>
                </div>
                <div class="song-control__heart-btn song-control__btn">
                    <i class="song-control__heart-icon song-control__icon far fa-heart"></i>
                </div>
                <div class="song-control__option-btn song-control__btn">
                    <i class="song-control__option-icon fas song-control__icon fa-ellipsis-h"></i>
                </div>
            </div>
        </li>
            `
        })
        html.join('')
        songList = $('.song-list'),
        songList.innerHTML = html
        this.songItems = $$('.song-list .song-item')
    },

    currentSongToView: function(){
        var allSongItem = $$('.song-item')
        allSongItem.forEach(songItem =>{
            songItem.classList.toggle('active', false)
            if(songItem.dataset.index == this.index){
                songItem.classList.toggle('active', true)
                songItem.scrollIntoView({behavior: 'smooth',
                block: 'center',
                inline: 'center'})
            }
        })
        var currentSong = this.musics.find(music =>{
            return music.id == this.index
        })
        this.disc.src = currentSong.image
        this.musicBigName.innerHTML = currentSong.name
        this.audio.src = currentSong.src
        this.playerDiscImg.src = currentSong.image
        this.playerNameTitle.innerHTML = currentSong.name
        this.playerNameSinger.innerHTML = currentSong.singer
        
    },

    setVolume: function(){
        this.audio.volume = this.volume
    },

    playSong: function(){
        this.discRotate.style.animationPlayState = "running"
        this.discRotate2.style.animationPlayState = "running"
        this.discWrapper.style.borderRadius = '50%'
        this.disc.style.height = this.disc.clientWidth + "px"
        this.disc.style.borderRadius = '50%'
        this.disc.style.filter = 'brightness(50%)'
        this.discOverlay.style.display = 'none'
        this.discPlay.style.display = 'block'
        this.playText.innerHTML = 'Tạm dừng'
        this.playIcon.classList.toggle('hidden', true)
        this.pauseIcon.classList.toggle('hidden', false)
        this.playerIconPause.classList.toggle('disable', false)
        this.playerIconPlay.classList.toggle('disable', true)
        this.audio.play()
    },
    
    pauseSong: function(){
        this.discRotate.style.animationPlayState = "paused"
        this.discRotate2.style.animationPlayState = "paused"
        this.disc.style.filter = 'brightness(100%)'
        this.discOverlay.style.display = 'flex'
        this.discPlay.style.display = 'none'
        this.playText.innerHTML = 'Tiếp tục phát'
        this.playIcon.classList.toggle('hidden', false)
        this.pauseIcon.classList.toggle('hidden', true)
        this.playerIconPause.classList.toggle('disable', true)
        this.playerIconPlay.classList.toggle('disable', false)
        this.audio.pause()
    },

    handleEvent: function(){
        _this = this

        //Khi bấm vào đĩa
        _this.discWrapper.addEventListener('click', (e)=>{
            _this.handlePlayView();
        })

        //Khi bấm vào nút tiếp tục phát/tạm dừng ở dưới đĩa 
        _this.playBtn.addEventListener('click', (e)=>{
            _this.handlePlayView();
        })

        //Khi bấm vào nút ở thanh player
        _this.playerPlayBtn.addEventListener('click', (e)=>{
            _this.handlePlayView();
        })

        // Khi bài hát đang chạy
        _this.audio.addEventListener('timeupdate', (e)=>{
            if(_this.audio.duration && !_this.isRewinding){
                _this.currentTime.innerHTML = secondToMinute(parseInt(_this.audio.currentTime))
                _this.remainingTime.innerHTML = secondToMinute(parseInt(_this.audio.duration) - parseInt(_this.audio.currentTime))
                _this.processBar.value = (_this.audio.currentTime / _this.audio.duration)*500
            }
        })

        //Khi bấm kéo thanh thời gian
        _this.processBar.addEventListener('change', (e)=>{
            _this.audio.currentTime = _this.processBar.value * _this.audio.duration / 500
        })

        //Khi ghì chuột vào thanh thời gian
        _this.processBar.addEventListener('mousedown', (e)=>{
            _this.isRewinding = true;
            _this.currentTime.innerHTML = secondToMinute(parseInt(_this.audio.currentTime))
            _this.remainingTime.innerHTML = secondToMinute(parseInt(_this.audio.duration) - parseInt(_this.audio.currentTime))
        })

        //Khi nhả chuột khỏi thanh thời gian
        _this.processBar.addEventListener('mouseup', (e)=>{
            _this.isRewinding = false;
        })

        //Khi hết nhạc
        _this.audio.addEventListener('ended', (e)=>{
            if(_this.isAgain){
                _this.audio.play()
            }
            else{
                _this.nextBtn.click()
            }
        })

        //Khi bấm next
        _this.nextBtn.addEventListener('click',(e)=>{
            if(!_this.isMix)_this.handleNextSong()
            else _this.handleRandomSong()
        })

        //Khi bấm prev
        _this.prevBtn.addEventListener('click',(e)=>{
            if(!_this.isMix)_this.handlePrevSong()
            else _this.handleRandomSong()
        })

        //Khi bấm trộn bài
        _this.mixBtn.addEventListener('click',(e)=>{
            _this.isMix = !_this.isMix
            _this.mixBtnIcon.classList.toggle('active', _this.isMix)
        })

        //Khi bấm phát lại
        _this.againBtn.addEventListener('click',(e)=>{
            _this.isAgain = !_this.isAgain
            _this.againBtnIcon.classList.toggle('active', _this.isAgain)
        })

        //Khi chọn 1 bài hát nào đó
        _this.songItems.forEach((songItem)=>{
            songItem.addEventListener('click', (e)=>{
                if(e.target.closest('.song-control__option-btn')){
                    return
                }
                if(songItem.dataset.index != _this.index){
                    _this.index = songItem.dataset.index
                    _this.currentSongToView()
                    _this.playSong()
                }
            })
        }) 

        //Khi bấm vào thanh âm lượng
        _this.volumeBar.addEventListener('change', (e)=>{
            _this.isMute = false
            _this.handleMuteShow()
            _this.volume = _this.volumeBar.value / 100
            _this.setVolume()
        })

        // Khi bấm vào biểu tượng volume
        _this.muteBtn.addEventListener('click', (e)=>{
            _this.isMute = !_this.isMute
            _this.handleMuteShow()
            if(_this.isMute){
                _this.volume = 0
            }
            else{
                _this.volume = _this.volumeBar.value / 100
            }
            _this.setVolume()
        })

    },

    //Xử lý xem play hay pause
    handlePlayView: function(){
        if(this.isPlay){
            this.pauseSong()
            
        }
        else{
            this.playSong()
            
        }
        this.isPlay = !this.isPlay
    },
    
    //Next bài
    handleNextSong: function(){
        if(this.index + 1 >= this.musics.length)this.index = 0
        else this.index += 1
        this.currentSongToView()
        this.playSong()
    },

    
    //Prev bài
    handlePrevSong: function(){
        if(this.index - 1 < 0)this.index = this.musics.length - 1
        else this.index -= 1
        this.currentSongToView()
        this.playSong()
    },

    //Chuyển bài ngẫu nhiên
    handleRandomSong: function(){
        newIndex = this.index
        while(newIndex == this.index){
            newIndex = Math.floor(Math.random() * this.musics.length)
        }
        this.index = newIndex
        this.currentSongToView()
        this.playSong()
    },

    //Trạng thái của nút mute
    handleMuteShow: function(){
        this.muteBtnLine.classList.toggle('active', this.isMute)
    },

    start: function(){
        this.allSongToView()
        this.currentSongToView()
        this.setVolume()
        this.handleEvent()
    },
}

musicPlayer.start();


secondToMinute = (time)=>{
    minute = parseInt(time / 60)
    if(minute < 10)minute = "0"+minute
    second = parseInt(time % 60)
    if(second < 10)second = "0"+second
    return (minute+":"+second)
}



