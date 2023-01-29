import React from 'react'
import '../css/allergy.css'

const Allergies = () => {
  return (
    <div>
        <div classNmaeName='allergies'>
            <form classNmae="medical-container">
            <p><strong>MEDICAL HISTORY: </strong>The following information is required to enable us to provide you with the best possible dental care. All information is
                strictly private and is protected. The dentist will review the questions and explain any that you do not understand. Please fill in the entire form</p>
            <fieldset classNmae="medical-fieldset">
                <legend>1.Are you being treated for any medical condition at the present or have been treated within the past year? If so, why?</legend>
                <div classNmae="medical-textfield">
                    <label classNmae="medical-radio" for="m1-yes">
                        <input type="radio" id="m1-yes" name="m1" value="m1-yes"/>
                        Yes,
                    </label>
                    <input type="text"/>
            
                </div>

                <div>
                <input type="radio" id="m1-no" name="m1" value="m1-no"/>
                <label for="m1-no">No</label>
                </div>

                <div>
                    <input type="radio" id="m1-maybe" name="m1" value="m1-maybe"/>
                    <label for="m1-maybe">Maybe/Not Sure</label>
                </div>
            </fieldset>

            <fieldset classNmae="medical-fieldset">
                <legend>2.When was your last medical checkup?</legend>
                <div>
                <input type="date" id="m2" name="m2"/>
                </div>
            </fieldset>

            <fieldset classNmae="medical-fieldset">
                <legend>3.Has there been any change in your general health in the past year? If yes, please explain.</legend>
                <div classNmae="medical-textfield">
                
                    <label classNmae="medical-radio" for="m3-yes"><input type="radio" id="m3-yes" name="m3" value="m3-yes"/>Yes, </label>
                    <input type="text"/>
                </div>
            
                <div>
                    <input type="radio" id="m3-no" name="m3" value="m3-no"/>
                    <label for="m3-no">No</label>
                </div>

                <div>
                    <input type="radio" id="m3-maybe" name="m3" value="m3-maybe"/>
                    <label for="m3-maybe">Maybe/Not Sure</label>
                </div>
            </fieldset>

            <fieldset classNmae="medical-fieldset">
                <legend>4.Are you taking any medications, non-prescription drugs, natural supplements of any kind? If yes please list with doses or provide list</legend>
                <div classNmae="medical-textfield">
                    <label classNmae="medical-radio"  for="m4-yes">
                        <input type="radio" id="m4-yes" name="m4" value="m4-yes"/>
                        Yes, 
                    </label>
                    <input type="text"/>
                </div>
            
                <div>
                    <input type="radio" id="m4-no" name="m4" value="m4-no"/>
                    <label for="m4-no">No</label>
                </div>

                <div>
                    <input type="radio" id="m4-maybe" name="m4" value="m4-maybe" />
                    <label for="m4-maybe">Maybe/Not Sure</label>
                </div>
            </fieldset>


            <fieldset classNmae="medical-fieldset">
                <legend>5. Do you have any allergies ? If yes please list below</legend>
                <div>
                    <input type="radio" id="m5-yes" name="m5" value="m5-yes" />
                    <label for="m5-yes">Yes, </label>
                    <div>
                        <label for="m5" name="m5-a" id="m5-a">a) medications: </label>
                        <input type="text" name="m5-a" id="m5-a" />
                    </div>
                    <div>
                        <label for="m5" name="m5-b" id="m5-b">b) latex/ rubber products/ metals: </label>
                        <input type="text" name="m5-b" id="m5-b" />
                    </div>
                    <div>
                        <label for="m5" name="m5-c" id="m5-c">c) Others (eg.foods, dyes): </label>
                        <input type="text" name="m5-c" id="m5-c" />
                    </div>
            
                </div>
            
                <div>
                    <input type="radio" id="m5-no" name="m5" value="m5-no" />
                    <label for="m5-no">No</label>
                </div>

                <div>
                    <input type="radio" id="m5-maybe" name="m5" value="m5-maybe" />
                    <label for="m5-maybe">Maybe/Not Sure</label>
                </div>
                
        
            </fieldset>
            <fieldset classNmae="medical-fieldset">
                <legend>6.Have you ever had a peculiar or adverse reaction to any medications or injections?</legend>
                <div>
                    <input type="radio" id="m6-yes" name="m6" value="m6-yes" />
                    <label for="m6-yes">Yes</label>
        
                </div>
            
                <div>
                    <input type="radio" id="m6-no" name="m6" value="m6-no" />
                    <label for="m6-no">No</label>
                </div>

                <div>
                    <input type="radio" id="m6-maybe" name="m6" value="m6-maybe" />
                    <label for="m6-maybe">Maybe/Not Sure</label>
                </div>
            </fieldset>
            <fieldset classNmae="medical-fieldset">
                <legend>7.Do you have or ever had asthma?</legend>
                <div>
                    <input type="radio" id="m7-yes" name="m7" value="m7-yes"/>
                    <label for="m7-yes">Yes </label>
        
                </div>
            
                <div>
                    <input type="radio" id="m7-no" name="m7" value="m7-no"/>
                    <label for="m7-no">No</label>
                </div>

                <div>
                    <input type="radio" id="m7-maybe" name="m7" value="m7-maybe"/>
                    <label for="m7-maybe">Maybe/Not Sure</label>
                </div>
            </fieldset>
            <fieldset classNmae="medical-fieldset">
                <legend>8.Do you have or ever had any heart or blood pressure problems?</legend>
                <div>
                    <input type="radio" id="m8-yes" name="m8" value="m8-yes"/>
                    <label for="m8-yes">Yes </label>
        
                </div>
            
                <div>
                    <input type="radio" id="m8-no" name="m8" value="m8-no"/>
                    <label for="m8-no">No</label>
                </div>

                <div>
                    <input type="radio" id="m8-maybe" name="m8" value="m8-maybe"/>
                    <label for="m8-maybe">Maybe/Not Sure</label>
                </div>
            </fieldset>
            <fieldset classNmae="medical-fieldset">
                <legend>9.Do you have or ever had a replacement or repair of a heart valve, infection of the heart (infective endocarditis), a heart condition from birth
                    (congenital heart disease) or a heart transplant?</legend>
                <div>
                    <input type="radio" id="m9-yes" name="m9" value="m9-yes"/>
                    <label for="m9-yes">Yes </label>
        
                </div>
            
                <div>
                    <input type="radio" id="m9-no" name="m9" value="m9-no"/>
                    <label for="m9-no">No</label>
                </div>

                <div>
                    <input type="radio" id="m9-maybe" name="m9" value="m9-maybe"/>
                    <label for="m9-maybe">Maybe/Not Sure</label>
                </div>
            </fieldset>

            <fieldset classNmae="medical-fieldset">
                <legend>10.Do you have a prosthetic or artificial joint? (i.e. knee or hip?)</legend>
                <div>
                    <input type="radio" id="m10-yes" name="m10" value="m10-yes"/>
                    <label for="m10-yes">Yes </label>
        
                </div>
            
                <div>
                    <input type="radio" id="m10-no" name="m10" value="m10-no"/>
                    <label for="m10-no">No</label>
                </div>

                <div>
                    <input type="radio" id="m10-maybe" name="m10" value="m10-maybe"/>
                    <label for="m10-maybe">Maybe/Not Sure</label>
                </div>
            </fieldset>
        
        
            <fieldset classNmae="medical-fieldset">
                <legend>11.Do you have any condition or therapies that could affect your immune system? (i.e. chemotherapy, radiotherapy, leukemia, AIDS/HIV infection)</legend>
                <div>
                    <input type="radio" id="m11-yes" name="m11" value="m11-yes"/>
                    <label for="m11-yes">Yes </label>
        
                </div>
            
                <div>
                    <input type="radio" id="m11-no" name="m11" value="m11-no"/>
                    <label for="m11-no">No</label>
                </div>

                <div>
                    <input type="radio" id="m11-maybe" name="m11" value="m11-maybe"/>
                    <label for="m11-maybe">Maybe/Not Sure</label>
                </div>
            </fieldset>

            
            <fieldset classNmae="medical-fieldset">
                <legend>12. Have you ever had hepatitis, jaundice (other than birth) or liver disease?</legend>
                <div>
                    <input type="radio" id="m12-yes" name="m12" value="m12-yes"/>
                    <label for="m12-yes">Yes </label>
        
                </div>
            
                <div>
                    <input type="radio" id="m12-no" name="m12" value="m12-no"/>
                    <label for="m12-no">No</label>
                </div>

                <div>
                    <input type="radio" id="m12-maybe" name="m12" value="m12-maybe"/>
                    <label for="m12-maybe">Maybe/Not Sure</label>
                </div>
            </fieldset>

            <fieldset classNmae="medical-fieldset">
                <legend>13. Do you have a bleeding problem or bleeding disorder?</legend>
                <div>
                    <input type="radio" id="m13-yes" name="m13" value="m13-yes"/>
                    <label for="m13-yes">Yes </label>
        
                </div>
            
                <div>
                    <input type="radio" id="m13-no" name="m13" value="m13-no" />
                    <label for="m13-no">No</label>
                </div>

                <div>
                    <input type="radio" id="m13-maybe" name="m13" value="m13-maybe" />
                    <label for="m13-maybe">Maybe/Not Sure</label>
                </div>
            </fieldset>

            <fieldset classNmae="medical-fieldset">
                <legend>14. Have you ever been hospitalized for any illness? Or had any surgeries? If Yes please explain</legend>
                <div classNmae="medical-textfield">

                

                    <label classNmae="medical-radio" for="m13-yes">
                        <input type="radio" id="m13-yes" name="m13" value="m13-yes" />
                            Yes,
                    </label>
                    <input type="text" />
        
                </div>
            
                <div>
                    <input type="radio" id="m13-no" name="m13" value="m13-no" />
                    <label for="m13-no">No</label>
                </div>

                <div>
                    <input type="radio" id="m13-maybe" name="m13" value="m13-maybe" />
                    <label for="m13-maybe">Maybe/Not Sure</label>
                </div>
            </fieldset>
            <fieldset classNmae="medical-fieldset">
                <legend>15. Do you smoke /use tobacco/marijuana products?</legend>
                <div classNmae="medical-textfield">
                    <label classNmae="medical-radio" for="m13-yes">
                        <input type="radio" id="m13-yes" name="m13" value="m13-yes" />
                        Yes, 
                    </label>
                    <label>How much per day? <input type="text" /> </label>
                    <label>How many years? <input type="number" /> </label>
            
                </div>
            
                <div>
                    <input type="radio" id="m13-no" name="m13" value="m13-no" />
                    <label for="m13-no">No</label>
                </div>

                <div>
                    <input type="radio" id="m13-maybe" name="m13" value="m13-maybe" />
                    <label for="m13-maybe">Maybe/Not Sure</label>
                </div>
            </fieldset>

        <p><strong>FOR WOMEN ONLY:</strong></p>
        <fieldset classNmae="medical-fieldset">
            <legend>1.Are you pregnant?</legend>
            <div classNmae="medical-textfield">
            <label classNmae="medical-radio" for="mw1-yes">
                <input type="radio" id="mw1-yes" name="mw1" value="mw1-yes" />
                Yes, 
                <label>Expected delivery date?<input type="text" /> </label> 
            </label>
            
            </div>
        
            <div>
                <input type="radio" id="mw1-no" name="mw1" value="mw1-no" />
                <label for="mw1-no">No</label>
            </div>

            <div>
                <input type="radio" id="mw1-maybe" name="mw1" value="mw1-maybe" />
                <label for="mw1-maybe">Maybe/Not Sure</label>
            </div>
        </fieldset>
        <fieldset classNmae="medical-fieldset">
            <legend>2. Are you breast feeding?</legend>
            <div>
                <input type="radio" id="mw2-yes" name="mw2" value="mw2-yes"/>
                <label for="mw2-yes">Yes</label>
            </div>
            <div>
                <input type="radio" id="mw2-no" name="mw2" value="mw2-no"/>
                <label for="mw2-no">No</label>
            </div>
        </fieldset>
        <fieldset classNmae="medical-fieldset">
            <legend>3. Are you on birth control pills?</legend>
            <div>
                <input type="radio" id="mw3-yes" name="mw3" value="mw3-yes" />
                <label for="mw3-yes">Yes</label>
            </div>
            <div>
                <input type="radio" id="mw3-no" name="mw3" value="mw3-no" />
                <label for="mw3-no">No</label>
            </div>
        </fieldset>


        <input type="submit" />

        </form>
        </div>
    </div>
  )
}

export default Allergies