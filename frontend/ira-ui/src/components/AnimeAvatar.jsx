import iraGif from "../assets/IRA.gif"

export default function AnimeAvatar(){
  return(
    <div style={styles.box}>
      <img 
        src={iraGif} 
        alt="IRA"
        style={styles.img}
      />
    </div>
  )
}

const styles = {
  box:{
    width:"220px",
    height:"220px",
    borderRadius:"20px",
    overflow:"hidden",
    boxShadow:"0 0 40px #ff5edf",
    margin:"auto"
  },

  img:{
    width:"100%",
    height:"100%",
    objectFit:"cover"
  }
}