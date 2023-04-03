import React, {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from "react-router-dom";
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import '../css/Home.css';
import '../css/toothchart.css';
import {toast} from "react-toastify";
import adultPNG from '../img/adultteeth.png';
import childPNG from '../img/childteeth.png';


const initialState = {
    a_ID: "",
    b_procedure: "",
    toothNo: "",
    toothType: "",
    procedFee: "",

  }


const ProceduresUpdate = () => {
    const [state, setState] = useState(initialState);
    const {a_ID, b_procedure, toothNo, toothType, procedFee} = state;
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [notes, setNotes] = useState({});
    const [showNoteInput, setShowNoteInput] = useState(false);
    const [selectedNote, setSelectedNote] = useState("");
    const [b_note, setBNote] = useState("");
    const {id} = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect (() => {

        axios.get(`http://localhost:5000/admin/appointment/procedure/procedure/get/${id}`)
        .then(response => {
          const {a_ID, b_procedure, b_note, toothNo, toothType, procedFee } = response.data[0];
          setData(response.data[0]);
          setState({a_ID: a_ID, b_procedure: b_procedure, b_note: b_note, toothNo: toothNo, toothType: toothType, procedFee: procedFee}); 
        }).catch(error => {
          console.error(error);
        });
          
      }, [id])
      console.log(data)
      console.log(data.a_ID)
    const handleSubmit = (e) =>{
        e.preventDefault();
        // console.log(typeof(selectedNumbers))
        // console.log(selectedNumbers)
        // console.log((selectedNumbers).toString())
        // const toothNo = (tooth).toString()

        if (!b_procedure || !toothNo || !procedFee){
            toast.error("Please provide value into each input field");
            toast.error(b_procedure)
            toast.error(toothNo)
            toast.error(procedFee)
            toast.error(toothType)

            
    
        } else{
            axios.put(`http://localhost:5000/admin/appointment/procedure/update/${id}`, {
                a_ID,
                b_procedure,
                b_note,
                toothNo, 
                toothType, 
                procedFee
          })
          
          
            .then(()=>{
                setState({a_ID: "", b_procedure: "", b_note: "", toothNo: "", toothType: "", procedFee: ""});
                toast.success("Procedure Added Successfully");
                setTimeout(()=> navigate(`/admin/appointment/procedures/${data.a_ID}`),500)
            })
            .catch((err) => toast.error(err.response.data));
            
          }
        }

        const handleNumberClick = (event) => {
            const number = event.target.innerText;
            if (selectedNumbers.includes(number)) {
              setSelectedNumbers(selectedNumbers.filter(n => n !== number));
            } else {
              setSelectedNumbers([...selectedNumbers, number]);
              const existingNote = notes[number] || "";
              setSelectedNote(existingNote);
            }
            setShowNoteInput(true);
          };

        console.log("notes:", notes);
        
        const saveNote = () => {
            const updatedNotes = { ...notes };
            
            selectedNumbers.forEach((number) => {
              updatedNotes[number] = selectedNote;
            });
            
            setNotes(updatedNotes);
            setSelectedNote("");
            setShowNoteInput(false);
            
            // Update b_note field
            const toothNotes = Object.entries(updatedNotes)
              .filter(([n, note]) => note !== "")
              .map(([n, note]) => `${n} - "${note}"`)
              .join(", ");
            setBNote(toothNotes);
          };

          const cancelNote = () => {
            setSelectedNote("");
            setShowNoteInput(false);
          };
    
    
          const handleChange = (event) => {
            const { name, value } = event.target;
            setState({ ...state, [name]: value });

          };


    // const toothNumberAndNotes = Object.entries(notes)
    // .filter(([n, note]) => note !== "")
    // .map(([n, note]) => `${n} - "${note}"`)
    // .join(', ');


    let selectedImage = toothType === "Adult" ? adultPNG : childPNG;
    //let selectedNumbers = toothType === "Adult" ? adultNumbers : childNumbers;

    return (
        <div>
            <header>
                <AdminNavbar />
            </header>
            <body>
              <Link to={`/admin/services/procedures/${data.a_ID}`}>
                    <button className='back__procedures'><span>Back</span></button>
                </Link>        
                <main className='display--flex m-0'>
                    <div className='appointmentCard1'>
                        <h3 className='book__title'>TOOTH CHART</h3>
                
                        <div className='toothchart__image-container'>
                            <img className='toothchart__image' src={selectedImage} alt={toothType} />
                            {toothType === 'Adult' ? (
                            <>
                                <div className={`toothchart__number toothchart__number--1${selectedNumbers.includes('1') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Wisdom Tooth - 3rd Molar">1</div>
                                <div className={`toothchart__number toothchart__number--2${selectedNumbers.includes('2') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Molar - 2nd Molar">2</div>
                                <div className={`toothchart__number toothchart__number--3${selectedNumbers.includes('3') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Molar - 1st Molar">3</div>
                                <div className={`toothchart__number toothchart__number--4${selectedNumbers.includes('4') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 2nd">4</div>
                                <div className={`toothchart__number toothchart__number--5${selectedNumbers.includes('5') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">5</div>
                                <div className={`toothchart__number toothchart__number--6${selectedNumbers.includes('6') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Canine (Eye tooth/Cuspid)">6</div>
                                <div className={`toothchart__number toothchart__number--7${selectedNumbers.includes('7') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Incisor - Lateral">7</div>
                                <div className={`toothchart__number toothchart__number--8${selectedNumbers.includes('8') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Incisor - Central">8</div>
                                <div className={`toothchart__number toothchart__number--9${selectedNumbers.includes('9') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">9</div>
                                <div className={`toothchart__number toothchart__number--10${selectedNumbers.includes('10') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">10</div>
                                <div className={`toothchart__number toothchart__number--11${selectedNumbers.includes('11') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">11</div>
                                <div className={`toothchart__number toothchart__number--12${selectedNumbers.includes('12') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">12</div>
                                <div className={`toothchart__number toothchart__number--13${selectedNumbers.includes('13') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">13</div>
                                <div className={`toothchart__number toothchart__number--14${selectedNumbers.includes('14') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">14</div>
                                <div className={`toothchart__number toothchart__number--15${selectedNumbers.includes('15') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">15</div>
                                <div className={`toothchart__number toothchart__number--16${selectedNumbers.includes('16') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">16</div>
                                <div className={`toothchart__number toothchart__number--17${selectedNumbers.includes('17') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">17</div>
                                <div className={`toothchart__number toothchart__number--18${selectedNumbers.includes('18') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">18</div>
                                <div className={`toothchart__number toothchart__number--19${selectedNumbers.includes('19') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">19</div>
                                <div className={`toothchart__number toothchart__number--20${selectedNumbers.includes('20') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">20</div>
                                <div className={`toothchart__number toothchart__number--21${selectedNumbers.includes('21') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">21</div>
                                <div className={`toothchart__number toothchart__number--22${selectedNumbers.includes('22') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">22</div>
                                <div className={`toothchart__number toothchart__number--23${selectedNumbers.includes('23') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">23</div>
                                <div className={`toothchart__number toothchart__number--24${selectedNumbers.includes('24') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">24</div>
                                <div className={`toothchart__number toothchart__number--25${selectedNumbers.includes('25') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">25</div>
                                <div className={`toothchart__number toothchart__number--26${selectedNumbers.includes('26') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">26</div>
                                <div className={`toothchart__number toothchart__number--27${selectedNumbers.includes('27') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">27</div>
                                <div className={`toothchart__number toothchart__number--28${selectedNumbers.includes('28') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">28</div>
                                <div className={`toothchart__number toothchart__number--29${selectedNumbers.includes('29') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">29</div>
                                <div className={`toothchart__number toothchart__number--30${selectedNumbers.includes('30') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">30</div>
                                <div className={`toothchart__number toothchart__number--31${selectedNumbers.includes('31') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">31</div>
                                <div className={`toothchart__number toothchart__number--32${selectedNumbers.includes('32') ? ' selected' : ''}`} onClick={handleNumberClick} data-label="Bicuspid - 1st">32</div>
                                {/* Add more number divs as needed */}
                            </>
                            ) : (
                            <>
                                <div className={`toothchart__number toothchart__number--a${selectedNumbers.includes('A') ? ' selected' : ''}`} onClick={handleNumberClick}>A</div>
                                <div className={`toothchart__number toothchart__number--b${selectedNumbers.includes('B') ? ' selected' : ''}`} onClick={handleNumberClick}>B</div>
                                <div className={`toothchart__number toothchart__number--c${selectedNumbers.includes('C') ? ' selected' : ''}`} onClick={handleNumberClick}>C</div>
                                <div className={`toothchart__number toothchart__number--d${selectedNumbers.includes('D') ? ' selected' : ''}`} onClick={handleNumberClick}>D</div>
                                <div className={`toothchart__number toothchart__number--e${selectedNumbers.includes('E') ? ' selected' : ''}`} onClick={handleNumberClick}>E</div>
                                <div className={`toothchart__number toothchart__number--f${selectedNumbers.includes('F') ? ' selected' : ''}`} onClick={handleNumberClick}>F</div>
                                <div className={`toothchart__number toothchart__number--g${selectedNumbers.includes('G') ? ' selected' : ''}`} onClick={handleNumberClick}>G</div>
                                <div className={`toothchart__number toothchart__number--h${selectedNumbers.includes('H') ? ' selected' : ''}`} onClick={handleNumberClick}>H</div>
                                <div className={`toothchart__number toothchart__number--i${selectedNumbers.includes('I') ? ' selected' : ''}`} onClick={handleNumberClick}>I</div>
                                <div className={`toothchart__number toothchart__number--j${selectedNumbers.includes('J') ? ' selected' : ''}`} onClick={handleNumberClick}>J</div>
                                <div className={`toothchart__number toothchart__number--k${selectedNumbers.includes('K') ? ' selected' : ''}`} onClick={handleNumberClick}>K</div>
                                <div className={`toothchart__number toothchart__number--l${selectedNumbers.includes('L') ? ' selected' : ''}`} onClick={handleNumberClick}>L</div>
                                <div className={`toothchart__number toothchart__number--m${selectedNumbers.includes('M') ? ' selected' : ''}`} onClick={handleNumberClick}>M</div>
                                <div className={`toothchart__number toothchart__number--n${selectedNumbers.includes('N') ? ' selected' : ''}`} onClick={handleNumberClick}>N</div>
                                <div className={`toothchart__number toothchart__number--o${selectedNumbers.includes('O') ? ' selected' : ''}`} onClick={handleNumberClick}>O</div>
                                <div className={`toothchart__number toothchart__number--p${selectedNumbers.includes('P') ? ' selected' : ''}`} onClick={handleNumberClick}>P</div>
                                <div className={`toothchart__number toothchart__number--q${selectedNumbers.includes('Q') ? ' selected' : ''}`} onClick={handleNumberClick}>Q</div>
                                <div className={`toothchart__number toothchart__number--r${selectedNumbers.includes('R') ? ' selected' : ''}`} onClick={handleNumberClick}>R</div>
                                <div className={`toothchart__number toothchart__number--s${selectedNumbers.includes('S') ? ' selected' : ''}`} onClick={handleNumberClick}>S</div>
                                <div className={`toothchart__number toothchart__number--t${selectedNumbers.includes('T') ? ' selected' : ''}`} onClick={handleNumberClick}>T</div>
                                {/* Add more number divs as needed */}
                            </>
                            )}
                        </div>
                        {showNoteInput && (
                            <div className='book__row'>
                                <label htmlFor='note'>NOTES: </label>
                                <textarea id="note" name="note" value={selectedNote} onChange={(e) => setSelectedNote(e.target.value)} placeholder='Add some notes for selected tooth... (optional)' />
                                <button onClick={saveNote}>Save Note</button>
                                <button onClick={cancelNote}>Cancel</button>
                            </div>
                            )}
                    </div>
                       
                    <div className='add-procedure appointmentCard1'>
                        <h3 className='book__title'>ADD PROCEDURE DETAILS</h3>
                        <form onSubmit={handleSubmit} style={{display: 'relative'}}>
                            <div className='book__row'>
                                <label htmlFor='procedure'>PROCEDURE: </label>
                                <select id="b_procedure" name="b_procedure"  value={b_procedure || "" }  onChange={handleChange} >
                                        <option value="" disabled selected>Select your option</option>
                                        <option value="Fillings">Fillings</option>
                                        <option value="Root Canal">Root Canal</option>
                                        <option value="Consultation">Consultation</option>
                                        <option value="Fixing Bridge">Fixing Bridge</option>
                                        <option value="Dental Implant">Dental Implant</option>
                                        <option value="Dental Crown">Dental Crown</option>
                                        <option value="X-Ray">X-Ray</option>
                                        <option value="Teeth Whitening"> Teeth Whitening</option>
                                        <option value="Dental Brace">Dental Brace</option>
                                        <option value="Tooth Extraction">Tooth Extraction</option>
                                        <option value="Scaling">Scaling</option>						
                                        <option value="Others">Other(Add a Note)</option>
                                </select>
                            </div>
                            <div className='toothchart__type'>
                            <label htmlFor='toothType'>Tooth Type: </label>
                            <select id="toothType" name="toothType" value={toothType || ""} onChange={handleChange}>
                                <option value="Adult" selected>Adult</option>
                                <option value="Child">Child</option>
                            </select>
                        </div>
                            <div className='book__row'>
                                <label htmlFor='toothNo'>TOOTH NUMBER: </label>
                                <input type='text' className='toothNoStyle' for='toothNo' id='toothNo' name='toothNo' value={selectedNumbers || toothNo || ""}  onChange={handleChange} placeholder='Enter Tooth Position/Number' disabled/>
                            </div>
                            <div className='book__row'>
                                <label htmlFor='b_note'>NOTES: </label>
                                <input type='text' id='b_note' className='toothNoStyle' name='b_note' value={b_note || ""} onChange={(e) => setBNote(e.target.value)} placeholder='Add some notes... (optional)' />
                            </div>
                            <p className='toothNo__note'>Note: Type <strong>N/A</strong> in Tooth Number if every teeth is included in the procedure</p> 
                            <div className='book__row'>
                                <label htmlFor='procedFee'>PROCEDURE FEE: </label>
                                <input type="number" className='procedFee' for="procedFee" id="procedFee" name="procedFee" value= {procedFee || "" }  onChange={handleChange} placeholder='Enter the Procedure Fee' />
                            </div> 
                            <div className='book__row' hidden>
                                <label htmlFor='a_ID' hidden>APPOINTMENT ID: </label>
                                <input type="number" className='a_ID' for="a_ID" id="a_ID" name="a_ID" value={id}  onChange={handleChange} placeholder='Enter the Procedure Fee' hidden />
                            </div> 
        

                            <div className='back__update-buttons1'>
                                <input type="submit" value="SUBMIT" className='btn-update1' />
                            </div>
                     </form>
                </div>
            </main>
        </body>
    </div>
    )
    }

    export default ProceduresUpdate