import  {useState, useEffect} from 'react';
import './App.css';
import {api} from './api/Api.tsx';
import ConeRenderer from './ConeRenderer';

type ConeData = {
    vertices: Array<number>;
    indices: Array<number>;
};

const App: React.FC = () => {
    const [threeCone, setThreeCone] = useState({
        height: 1,
        radius: 1,
        segments: 8,
    });

    const [coneData, setConeData] = useState<ConeData | null>(null);

    const [height, setHeight] = useState<number | ''>(1);
    const [radius, setRadius] = useState<number | ''>(1);
    const [segments, setSegments] = useState<number | ''>(8);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        api
            .getConeTriangulation(threeCone)
            .then((res) => {
                setConeData({
                    indices: res?.data?.indices,
                    vertices: res?.data?.vertices,
                });
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [threeCone]);


    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value) < 0) {
            return;
        }

        const newValue = parseFloat(e.target.value);

        if (!isNaN(newValue) && newValue >= 0) {
            setHeight(newValue);
        } else {
            setHeight('')
        }
    };

    const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value) < 0) {
            return;
        }
        const newValue = parseFloat(e.target.value);

        if (!isNaN(newValue) && newValue >= 0) {
            setRadius(newValue);
        } else {
            setRadius('')
        }
    };

    const handleSegmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value) < 0) {
            return;
        }

        const newValue = parseFloat(e.target.value);

        if (!isNaN(newValue) && newValue >= 0) {
            setSegments(newValue);
        } else {
            setSegments('')
        }
    };

    const handleUpdateClick = () => {
        if (height && radius && segments) {
            setThreeCone({
                height,
                radius,
                segments,
            });
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSegments(360);
        } else {
            setSegments(8);
        }
    };

    return (
        <div>
            <h1 className="appContainer">Введите параметры конуса:</h1>
            <div className="labelsAndInputs">
                <label htmlFor="height">
                    <b>Высота:</b>
                </label>
                <input type="number" id="height" value={height} onChange={handleHeightChange} step="0.1" max={7}/>
                <label htmlFor="radius">
                    <b>Радиус:</b>
                </label>
                <input type="number" id="radius" value={radius} onChange={handleRadiusChange} step="0.1" max={6}/>
                <div>
                    <label htmlFor="segments">
                        <b>Сегменты:</b>
                    </label>
                    <input type="number" id="segments" value={segments} onChange={handleSegmentsChange} max={80}/>
                </div>
            </div>
            <label className="checkbox">
                <input type="checkbox" checked={Boolean(segments && segments >= 360)} onChange={handleCheckboxChange}/>
                Дополнительное задание (гладкий конус)
            </label>
            <button
                className={`button ${isLoading ? "loading" : ''}`}
                onClick={handleUpdateClick}
                disabled={!height || !radius || !segments}
            >
                {isLoading ? 'Загрузка...' : 'Обновить конус'}
            </button>
            {coneData && <ConeRenderer vertices={coneData?.vertices} indices={coneData?.indices}/>}
        </div>
    );
};

export default App;
