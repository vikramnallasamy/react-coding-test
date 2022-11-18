import styled from 'styled-components'

const Table = ({data}) => {
    if(!data) {
        return null
    }
    return (
        <>
            <table style={{margin:'auto'}}  cellSpacing='0px'>
                <tbody>
                <TR>
                    <TH>SNO</TH><TH>FIRST NAME</TH><TH>LAST NAME</TH><TH>GENDER</TH><TH>HAIR COLOR</TH>
                </TR>
                    {data?.map((row,rno)=>{
                        return <TR key={row.firstName}>
                            <TD>{rno+1}</TD>
                            <TD>{row.firstName}</TD>
                            <TD>{row.lastName}</TD>
                            <TD>{row.gender}</TD>
                            <TD>{row.hair?.color}</TD>
                        </TR>})
                    }
                </tbody>
            </table>
        </>
    )
}

export const TD = styled.td`
padding : 0.5rem;
text-align:left;
border: 0px;
text-transform: capitalize;
`
export const TR = styled.tr`
&:nth-child(2n) {
    background: lightcyan;
}
&:nth-child(2n+1) {
    background: lightblue;
}
border: 0px;
`
export const TH = styled.th`
    text-transform: uppercase;
    text-align: left;
    padding: 0.5rem;
    background: lightblue;
`

export default Table