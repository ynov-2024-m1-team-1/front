import React from 'react';
import Link from 'next/link';
import Button from "@/components/UI/Button";

const Table = ({ data, type, handleDelete }) => {

    const items = data?.data;

    if (!items || items.length === 0) {
        return <div>Aucune donnée à afficher</div>;
    }

    return (
        <>
            {type === 'user' && (
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr >
                            <th style={{ border: '1px solid black', padding: '8px' }}>Id</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Nom d'utilisateur</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.id}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.username}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.email}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    <Link href={`/backoffice/users/${item.id}`}>
                                        <Button title="Modifier" />
                                    </Link>
                                </td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    <Button onClick={() => handleDelete(item.id)} title="Supprimer" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {type === 'product' && (
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Nom du produit</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Image du Produit</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Actif</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Packshot</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.id}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.name}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.description}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.image}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.active}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.packshot}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.price}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    <Link href={`/backoffice/products/${item.id}`}>
                                        <Button title="Modifier" />
                                    </Link>
                                </td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    <Button onClick={() => handleDelete(item.id)} title="Supprimer" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Table;
