import React from 'react';
import AddItemButton from '../../../AddItemButton/AddItemButton';

const Tecnologias = () => {
    return (
        <div>
            <div>

                <AddItemButton text='Añadir stack' />
            </div>
            <div>
                Otras Tecnologias
                <AddItemButton text='Añadir tecnología' />
            </div>
        </div>
    );
}

export default Tecnologias;