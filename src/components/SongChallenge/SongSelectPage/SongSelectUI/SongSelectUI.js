import './SongSelectUI.css'

const SongSelectUI = props =>{

    const { data, handleSongSelect } = props;

    return (
        <div className='SongSelectUI-Container'>
            <div className='SongSelectUI' style={{backgroundImage: `URL('` + data.songImage + `')`, backgroundPosition: 'center', backgroundSize: 'cover'}} onClick={() => handleSongSelect(data, data.staminaCost)} >
                <div className='SongCost'><h1>Cost: {data.staminaCost}</h1></div>
            </div>
        </div>
    )
}

export default SongSelectUI