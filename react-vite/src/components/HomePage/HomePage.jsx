import './HomePage.css'

export default function HomePage() {
  return (
    <div className="MainPage">
      <div className="WhitePanel">
        <h1 className="Title">Simple AI Project</h1>
        <div className="SubTitle">
          implementing a simple AI interface into a web browser.
        </div>
       
      </div>
      <div className="ContentColumn">
        <div className="TextBox">
           This is an exploratory web application that tests integrating a simple AI interface into a browser environment. 
           Its core goal was to help me better understand how to combine AI model backend services with a frontend interface, focusing on practical implementation details such as request handling, response processing, and UI responsiveness. 
       </div>
        <div className="TextBox greenVariant">
          <p className='noteHeader'>NOTE</p>
          <p className='noteText'>Unfortunately the response times of the AI being used can take up to 1 or 2 minutes due to budget constraints on my part and limitations of free software! Please be patient if the AI is taking a moment to load a response especially with images!</p>
        </div>
      </div>
    </div>
  );
}
