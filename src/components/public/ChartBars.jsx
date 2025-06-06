import './ChartBars.css'

function ChartBars(props) {
    const percentage = (value) => Math.round((value / props.total) * 100)
    return (
        <div
            className='container m-0 p-0 w-100 mw-100'
            id='chart'
        >
            {props.resps
                .filter((res) => res.votes)
                .map((resp) => (
                    <div
                        className='item'
                        key={resp.id}
                    >
                        <div className='info'>
                            {resp.value} (
                            <strong>{Math.floor(resp.votes * 6.14)}</strong>{' '}
                            votos,{' '}
                            <strong>
                                <span style={{ color: '#0033da' }}>
                                    {percentage(resp.votes)}%
                                </span>
                            </strong>
                            )
                        </div>
                        <div
                            className='bar'
                            style={{
                                backgroundColor: 'rgb(0, 51, 218)',
                                width: percentage(resp.votes) + '%',
                            }}
                        ></div>
                    </div>
                ))}
            <p className='mt-2'>
                Total de Participantes:{' '}
                <strong>{Math.floor(props.total * 6.13)}</strong>
            </p>
        </div>
    )
}
export default ChartBars
