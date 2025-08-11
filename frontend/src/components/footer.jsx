

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-gray-900  text-base-content rounded p-10">
            <nav className="grid grid-flow-col gap-4">
                <aside>
                    Website created by <a onClick={() => window.open("https://www.prateekbalani.com")} className='cursor-pointer'><u>Prateek Balani</u></a>
                </aside>
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    
                </div>
            </nav>
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Prateek Balani</p>
            </aside>
        </footer>
    );


}

export default Footer