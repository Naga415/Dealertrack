/** Edit Taxes -- Fee Tax Setup Tab Content **/
import React from 'react';
import PropTypes from "prop-types";

export default class FeeTaxSetup extends React.Component{
   renderTableRows = () => {
     return this.props.data.map(r => (<tr key={`row ${r.feeType}`}>
       <td>{r.feeType}</td>
       <td><input type = "checkbox"/></td>
       <td><input type = "checkbox"/></td>
       <td><input type = "checkbox"/></td>
       <td><input type = "checkbox"/></td>
     </tr>));
   }

   render(){
     return (
       <div className="row" id="edit-tax-fee-setup">
         <div className = "nav-tabs-content">
           <strong className="text">Following are the fees available.</strong>
           <table className="table fee-tax-setup-table">
             <thead>
               <tr>
                 <th>Fee Type</th>
                 <th>Fee Name</th>
                 <th>Tax if cap</th>
                 <th>Tax if DIA</th>
                 <th>CRT</th>
               </tr>
             </thead>
             <tbody>
               {this.renderTableRows()}
             </tbody>
           </table>
         </div>
       </div>
     );}
}


FeeTaxSetup.propTypes = {
  data: PropTypes.array
};
