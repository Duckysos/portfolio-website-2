import React, { useState, useEffect } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const AdminPage = () => {
    const [projects, setProjects] = useState([]);
    const [logs, setLogs] = useState([]);
    const [projectForm, setProjectForm] = useState({ id: null, title: '', description: '', tags: '', github_link: '', color: 'var(--primary-color)', status: 'completed' });
    const [logForm, setLogForm] = useState({ title: '', description: '', tags: '', github_link: '', date: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('projects');
    const navigate = useNavigate();

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setLogs((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);

                const positions = newItems.map((item, index) => ({ id: item.id, position: index }));
                api.put('/learning-logs/reorder', positions).catch(err => console.error("Error reordering", err));

                return newItems;
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [projectsRes, logsRes] = await Promise.all([
                api.get('/projects'),
                api.get('/learning-logs')
            ]);
            setProjects(projectsRes.data);
            setLogs(logsRes.data);
        } catch (err) {
            console.error("Error fetching data", err);
            if (err.response && err.response.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...projectForm,
                tags: typeof projectForm.tags === 'string' ? projectForm.tags.split(',').map(t => t.trim()) : projectForm.tags
            };

            if (isEditing) {
                await api.put(`/projects/${projectForm.id}`, payload);
            } else {
                await api.post('/projects', payload);
            }

            setProjectForm({ id: null, title: '', description: '', tags: '', github_link: '', color: 'var(--primary-color)', status: 'completed' });
            setIsEditing(false);
            fetchData();
        } catch (err) {
            console.error("Error saving project", err);
        }
    };

    const handleEditProject = (project) => {
        setProjectForm({
            id: project.id,
            title: project.title,
            description: project.description,
            tags: project.tags.join(', '),
            github_link: project.github_link,
            color: project.color,
            status: project.status || 'completed'
        });
        setIsEditing(true);
        setActiveTab('projects');
    };

    const handleCancelEdit = () => {
        setProjectForm({ id: null, title: '', description: '', tags: '', github_link: '', color: 'var(--primary-color)', status: 'completed' });
        setIsEditing(false);
    };

    const handleLogSubmit = async (e) => {
        e.preventDefault();
        console.log("handleLogSubmit called", logForm);
        try {
            const payload = {
                ...logForm,
                tags: logForm.tags.split(',').map(t => t.trim())
            };
            await api.post('/learning-logs', payload);
            setLogForm({ title: '', description: '', tags: '', github_link: '', date: '' });
            fetchData();
        } catch (err) {
            console.error("Error creating log", err);
        }
    };

    const handleDeleteProject = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await api.delete(`/projects/${id}`);
                fetchData();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleDeleteLog = async (id) => {
        try {
            await api.delete(`/learning-logs/${id}`);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="section" style={{ paddingTop: '120px', minHeight: '100vh' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <h1 className="gradient-text">Admin Dashboard</h1>
                    <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <button
                        onClick={() => setActiveTab('projects')}
                        style={{
                            padding: '0.8rem 2rem',
                            background: activeTab === 'projects' ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => setActiveTab('logs')}
                        style={{
                            padding: '0.8rem 2rem',
                            background: activeTab === 'logs' ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        Learning Logs
                    </button>
                </div>

                {activeTab === 'projects' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
                            <form onSubmit={handleProjectSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input placeholder="Title" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} required style={inputStyle} />
                                <textarea placeholder="Description" value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} required style={{ ...inputStyle, minHeight: '100px' }} />
                                <input placeholder="Tags (comma separated)" value={projectForm.tags} onChange={e => setProjectForm({ ...projectForm, tags: e.target.value })} required style={inputStyle} />
                                <input placeholder="GitHub Link" value={projectForm.github_link} onChange={e => setProjectForm({ ...projectForm, github_link: e.target.value })} style={inputStyle} />
                                <input placeholder="Color (e.g. var(--primary-color))" value={projectForm.color} onChange={e => setProjectForm({ ...projectForm, color: e.target.value })} style={inputStyle} />
                                <select value={projectForm.status} onChange={e => setProjectForm({ ...projectForm, status: e.target.value })} style={inputStyle}>
                                    <option value="completed">Completed</option>
                                    <option value="in-development">In Development</option>
                                </select>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button type="submit" style={buttonStyle}>{isEditing ? 'Update Project' : 'Add Project'}</button>
                                    {isEditing && <button type="button" onClick={handleCancelEdit} style={{ ...buttonStyle, background: 'grey' }}>Cancel</button>}
                                </div>
                            </form>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', maxHeight: '600px', overflowY: 'auto' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Existing Projects</h3>
                            {projects.map(p => (
                                <div key={p.id} style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <strong>{p.title}</strong>
                                        <p style={{ fontSize: '0.8rem', color: '#aaa' }}>{p.tags.join(', ')}</p>
                                        <span style={{ fontSize: '0.7rem', background: p.status === 'completed' ? 'green' : 'orange', padding: '2px 6px', borderRadius: '4px' }}>{p.status}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => handleEditProject(p)} style={{ color: 'var(--accent-color)', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                                        <button onClick={() => handleDeleteProject(p.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Add Learning Log</h3>
                            <form onSubmit={handleLogSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input placeholder="Title" value={logForm.title} onChange={e => setLogForm({ ...logForm, title: e.target.value })} required style={inputStyle} />
                                <textarea placeholder="Description" value={logForm.description} onChange={e => setLogForm({ ...logForm, description: e.target.value })} required style={{ ...inputStyle, minHeight: '100px' }} />
                                <input placeholder="Tags (comma separated)" value={logForm.tags} onChange={e => setLogForm({ ...logForm, tags: e.target.value })} required style={inputStyle} />
                                <input placeholder="GitHub Link" value={logForm.github_link} onChange={e => setLogForm({ ...logForm, github_link: e.target.value })} style={inputStyle} />
                                <input placeholder="Date (e.g. November 2025)" value={logForm.date} onChange={e => setLogForm({ ...logForm, date: e.target.value })} required style={inputStyle} />
                                <button
                                    type="button"
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onClick={handleLogSubmit}
                                    style={buttonStyle}
                                >
                                    Add Log
                                </button>
                            </form>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', maxHeight: '600px', overflowY: 'auto' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Existing Logs</h3>
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={logs}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {logs.map(l => (
                                        <SortableItem key={l.id} id={l.id}>
                                            <div>
                                                <strong>{l.title}</strong>
                                                <p style={{ fontSize: '0.8rem', color: '#aaa' }}>{l.date}</p>
                                            </div>
                                            <button
                                                onPointerDown={(e) => e.stopPropagation()} // Prevent drag when clicking delete
                                                onClick={() => handleDeleteLog(l.id)}
                                                style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                                            >
                                                Delete
                                            </button>
                                        </SortableItem>
                                    ))}
                                </SortableContext>
                            </DndContext>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const inputStyle = {
    padding: '0.8rem',
    borderRadius: '5px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: 'white'
};

const buttonStyle = {
    padding: '1rem',
    background: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const SortableItem = (props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        ...props.style,
        marginBottom: '1rem',
        background: 'rgba(255,255,255,0.05)',
        padding: '1rem',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'grab'
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {props.children}
        </div>
    );
};

export default AdminPage;
