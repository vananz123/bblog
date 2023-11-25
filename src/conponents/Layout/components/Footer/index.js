const Footer =()=> {
    return (
        <footer className="text-center text-lg-start text-muted bg-primary mt-3">
            <section className="">
                <div className="container text-center text-md-start pt-4 pb-4">
                    <div className="row mt-3">
                        <div className="col-12 col-lg-3 col-sm-12 mb-2">
                        <a href="https://mdbootstrap.com/" target="_blank" className="text-white h2">
                            VA
                        </a>
                        <p className="mt-1 text-white">
                            © 2023 Copyright: MDBootstrap.com
                        </p>
                        </div>

                        <div className="col-6 col-sm-4 col-lg-2">
                        <h6 className="text-uppercase text-white fw-bold mb-2">
                            Store
                        </h6>
                        <ul className="list-unstyled mb-4">
                            <li><a className="text-white-50" href="#">About us</a></li>
                            <li><a className="text-white-50" href="#">Find store</a></li>
                            <li><a className="text-white-50" href="#">Categories</a></li>
                            <li><a className="text-white-50" href="#">Blogs</a></li>
                        </ul>
                        </div>
                        <div className="col-6 col-sm-4 col-lg-2">
                        <h6 className="text-uppercase text-white fw-bold mb-2">
                            Information
                        </h6>
                        <ul className="list-unstyled mb-4">
                            <li><a className="text-white-50" href="#">Help center</a></li>
                            <li><a className="text-white-50" href="#">Money refund</a></li>
                            <li><a className="text-white-50" href="#">Shipping info</a></li>
                            <li><a className="text-white-50" href="#">Refunds</a></li>
                        </ul>
                        </div>
                        <div className="col-6 col-sm-4 col-lg-2">
                        <h6 className="text-uppercase text-white fw-bold mb-2">
                            Support
                        </h6>
                        <ul className="list-unstyled mb-4">
                            <li><a className="text-white-50" href="#">Help center</a></li>
                            <li><a className="text-white-50" href="#">Documents</a></li>
                            <li><a className="text-white-50" href="#">Account restore</a></li>
                            <li><a className="text-white-50" href="#">My orders</a></li>
                        </ul>
                        </div>
                    </div>
                </div>
            </section>

            </footer>
    )
}
export default Footer