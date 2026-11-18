import Button from './Button'
function Navbar() {
    return(
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <img src="logo.png" style={{width:"100px", height:'100px'}}></img>
    <a class="navbar-brand" href="#"><b>S</b>tyle<b>A</b>ura</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="#">Home</a>
        <a class="nav-link" href="#">Shop</a>
        <a class="nav-link" href="#">Collections</a>
        <a class="nav-link" href="#">About</a>
        <a class="nav-link" href="#">Contact</a>
      </div>
    </div>
    <Button />
  </div>
</nav>
        </div>
    )
}

export default Navbar