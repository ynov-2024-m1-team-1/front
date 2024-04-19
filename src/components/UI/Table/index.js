import React from "react";
import Link from "next/link";
import Button from "@/components/UI/Button";
import styles from './styles.css';

const Table = ({ data, type, handleDelete }) => {
    const items = data?.data;

    if (!items || items.length === 0) {
        return <div>Aucune donnée à afficher</div>;
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {type === "user" && (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-s text-white uppercase bg-neutral-900 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nom Utilisateur
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                                key={item._id}
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-200 dark:bg-gray-800"
                                >
                                    {item._id}
                                </th>
                                <td className="px-6 py-4">
                                    {item.name} {item.surname}
                                </td>
                                <td className="px-6 py-4">{item.email}</td>
                                <td className="px-6 py-4">
                                    <div className="inline-flex space-x-4">
                                        <Link
                                            href={`/backoffice/users/${item._id}`}
                                        >
                                            <Button
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                title="Modifier"
                                            />
                                        </Link>
                                        <Button
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                            onClick={() =>
                                                handleDelete(item._id)
                                            }
                                            title="Supprimer"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-neutral-900 dark:bg-gray-700 dark:text-gray-400 text-white text-center">
                        <tr className="text-s text-white uppercase bg-neutral-900 dark:bg-gray-700 dark:text-gray-400">
                            <th scope="row" className="px-6 py-3 uppercase">
                                Total Utilisateur
                            </th>
                            <td className="px-6 py-3 font-semibold">
                                {items.length}
                            </td>
                            <td
                                colSpan="2"
                                className="px-6 py-3 uppercase font-semibold"
                            >
                                Total Admin
                            </td>
                            <td className="px-6 py-3 text-green-400 font-semibold">
                                {items.filter((user) => user.isAdmin).length}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            )}
            {type === "product" && (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-s text-white uppercase bg-neutral-900 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                           <th scope="col" className="px-6 py-3">ID</th>
                           <th scope="col" className="px-6 py-3">Produit</th>
                           <th scope="col" className="px-6 py-3">Description</th>
                           <th scope="col" className="px-6 py-3">Statut</th>
                           <th scope="col" className="px-6 py-3">Packshot</th>
                           <th scope="col" className="px-6 py-3">Prix</th>
                           <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.products.map((item) => (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                                key={item._id}
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-200 dark:bg-gray-800"
                                >
                                    {item._id}
                                </th>
                                <td aria-label="aaaaaa" className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">{item.description}</td>
                                {item.active ? (
                                    <td className="px-6 py-4 text-green-500 dark:text-green-400">
                                        Actif
                                    </td>
                                ) : (
                                    <td className="px-6 py-4 text-red-500 dark:text-red-400">
                                        Inactif
                                    </td>
                                )}
                                <td className="px-6 py-4"><img className="w-16 h-16 justify-center" src={item.packshot}/></td>
                                <td className="px-6 py-4">{item.price}€</td>
                                <td className="px-6 py-4">
                                    <div className="inline-flex space-x-4">
                                        <Link
                                            href={`/backoffice/products/${item._id}`}
                                        >
                                            <Button
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                title="Modifier"
                                            />
                                        </Link>
                                        <Button
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                            onClick={() =>
                                                handleDelete(item._id)
                                            }
                                            title="Supprimer"
                                        />
                                    </div>
                                </td>
                            </tr>

                            
                        ))}
                    </tbody>
                    <tfoot className="bg-neutral-900 dark:bg-gray-700 dark:text-gray-400 text-white text-center">
                        <tr className="text-s text-white uppercase bg-neutral-900 dark:bg-gray-700 dark:text-gray-400">
                            <th scope="row" className="px-6 py-3 uppercase">
                                Total de produit
                            </th>
                            <td className="px-6 py-3 font-semibold">
                                {items.products.length}
                            </td>
                            <td
                                colSpan="2"
                                className="px-6 py-3 uppercase font-semibold"
                            >
                                Total actif
                            </td>
                            <td className="px-6 py-3 text-green-400 font-semibold">
                                {
                                    items.products.filter((item) => item.active)
                                        .length
                                }
                            </td>
                            <td
                                colSpan="2"
                                className="px-6 py-3 uppercase font-semibold"
                            >
                                Total inactif
                            </td>
                            <td className="px-6 py-3 uppercase text-red-400 font-semibold">
                                {
                                    items.products.filter(
                                        (item) => !item.active
                                    ).length
                                }
                            </td>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
};

export default Table;
