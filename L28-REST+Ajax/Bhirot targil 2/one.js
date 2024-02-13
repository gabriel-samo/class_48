document.addEventListener('event:one',(data)=>{
    one.innerHTML += `
        <tr>
            <td>${data.detail.district}</td>
            <td>${data.detail.city}</td>
            <td>${data.detail.sumcandidates}</td>
            <td dir="ltr">${data.detail.candidates.replaceAll(',','\n')}</td>
        </tr>
    `
})