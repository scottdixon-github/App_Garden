import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for our data
export type GardenPlot = {
  id: string;
  name: string;
  size: string;
  plants: number;
  createdAt: string;
};

export type Plant = {
  id: string;
  name: string;
  type: string;
  sunlight: string;
  water: string;
  difficulty: string;
  growthTime: string;
  description: string;
  image: string;
  inGarden: boolean;
  plotId?: string;
};

export type Task = {
  id: string;
  task: string;
  date: string;
  completed: boolean;
  plotId?: string;
  plantId?: string;
};

export type MeditationSession = {
  id: string;
  title: string;
  duration: string;
  completedAt: string;
};

export type Recipe = {
  id: string;
  name: string;
  category: string;
  prepTime: string;
  difficulty: string;
  ingredients: string[];
  gardenIngredients: string[];
  instructions: string;
  isFavorite: boolean;
  nutritionInfo: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
};

// Context type
type GardenContextType = {
  // Garden plots
  gardenPlots: GardenPlot[];
  addGardenPlot: (plot: Omit<GardenPlot, 'id' | 'createdAt'>) => Promise<void>;
  updateGardenPlot: (plot: GardenPlot) => Promise<void>;
  deleteGardenPlot: (id: string) => Promise<void>;
  
  // Plants
  plants: Plant[];
  addPlant: (plant: Omit<Plant, 'id'>) => Promise<void>;
  updatePlant: (plant: Plant) => Promise<void>;
  deletePlant: (id: string) => Promise<void>;
  addPlantToGarden: (plantId: string, plotId: string) => Promise<void>;
  removePlantFromGarden: (plantId: string) => Promise<void>;
  
  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskCompletion: (id: string) => Promise<void>;
  
  // Meditation
  meditationSessions: MeditationSession[];
  addMeditationSession: (session: Omit<MeditationSession, 'id' | 'completedAt'>) => Promise<void>;
  
  // Recipes
  recipes: Recipe[];
  toggleRecipeFavorite: (id: string) => Promise<void>;
  
  // Streaks
  currentStreak: number;
  longestStreak: number;
  sessionsThisWeek: number;
  totalSessions: number;
  
  // Loading state
  isLoading: boolean;
};

// Create context with default values
const GardenContext = createContext<GardenContextType | undefined>(undefined);

// Sample data
const samplePlants: Plant[] = [
  { 
    id: '1', 
    name: 'Tomato', 
    type: 'Vegetable', 
    sunlight: 'Full Sun', 
    water: 'Regular', 
    difficulty: 'Easy',
    growthTime: '70-85 days',
    description: 'Tomatoes are the most popular garden vegetable to grow. They require relatively little space and can yield a large harvest.',
    image: 'https://example.com/tomato.jpg',
    inGarden: false
  },
  { 
    id: '2', 
    name: 'Basil', 
    type: 'Herb', 
    sunlight: 'Full Sun', 
    water: 'Moderate', 
    difficulty: 'Easy',
    growthTime: '50-70 days',
    description: 'Basil is a popular culinary herb. It grows quickly and can be harvested multiple times throughout the growing season.',
    image: 'https://example.com/basil.jpg',
    inGarden: true,
    plotId: '1'
  },
  { 
    id: '3', 
    name: 'Lavender', 
    type: 'Flower', 
    sunlight: 'Full Sun', 
    water: 'Low', 
    difficulty: 'Moderate',
    growthTime: '90-200 days',
    description: 'Lavender is a beautiful and fragrant perennial that attracts pollinators and can be used in cooking, crafts, and aromatherapy.',
    image: 'https://example.com/lavender.jpg',
    inGarden: false
  },
  { 
    id: '4', 
    name: 'Carrot', 
    type: 'Vegetable', 
    sunlight: 'Full Sun/Partial Shade', 
    water: 'Moderate', 
    difficulty: 'Moderate',
    growthTime: '70-80 days',
    description: 'Carrots are root vegetables that are relatively easy to grow in loose, sandy soil. They are packed with nutrients.',
    image: 'https://example.com/carrot.jpg',
    inGarden: true,
    plotId: '1'
  },
  { 
    id: '5', 
    name: 'Mint', 
    type: 'Herb', 
    sunlight: 'Partial Shade', 
    water: 'Regular', 
    difficulty: 'Easy',
    growthTime: '70-90 days',
    description: "Mint is a fast-growing, aromatic herb that spreads quickly. It's best grown in containers to prevent it from taking over your garden.",
    image: 'https://example.com/mint.jpg',
    inGarden: true,
    plotId: '2'
  },
];

const samplePlots: GardenPlot[] = [
  { id: '1', name: 'Vegetable Garden', size: '10x10 ft', plants: 2, createdAt: '2025-04-15T10:30:00Z' },
  { id: '2', name: 'Herb Garden', size: '5x5 ft', plants: 1, createdAt: '2025-04-20T14:45:00Z' },
  { id: '3', name: 'Flower Bed', size: '8x3 ft', plants: 0, createdAt: '2025-05-01T09:15:00Z' }
];

const sampleTasks: Task[] = [
  { id: '1', task: 'Water vegetable garden', date: '2025-05-09', completed: false, plotId: '1' },
  { id: '2', task: 'Harvest basil', date: '2025-05-10', completed: false, plantId: '2' },
  { id: '3', task: 'Plant tomato seedlings', date: '2025-05-12', completed: false, plotId: '1' },
];

const sampleRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Garden Fresh Salad',
    category: 'Lunch',
    prepTime: '15 min',
    difficulty: 'Easy',
    ingredients: [
      'Fresh lettuce', 'Cherry tomatoes', 'Cucumber', 'Red onion', 
      'Bell pepper', 'Olive oil', 'Balsamic vinegar', 'Salt and pepper'
    ],
    gardenIngredients: ['lettuce', 'tomatoes', 'cucumber'],
    instructions: 'Wash and chop all vegetables. Mix in a large bowl. Drizzle with olive oil and balsamic vinegar. Season with salt and pepper to taste.',
    isFavorite: false,
    nutritionInfo: {
      calories: 120,
      protein: '2g',
      carbs: '10g',
      fat: '8g',
      fiber: '3g'
    }
  },
  {
    id: '2',
    name: 'Herb Roasted Vegetables',
    category: 'Dinner',
    prepTime: '45 min',
    difficulty: 'Medium',
    ingredients: [
      'Carrots', 'Potatoes', 'Zucchini', 'Red onion', 
      'Fresh rosemary', 'Fresh thyme', 'Olive oil', 'Salt and pepper', 'Garlic'
    ],
    gardenIngredients: ['carrots', 'zucchini', 'rosemary', 'thyme'],
    instructions: 'Preheat oven to 425°F. Chop vegetables into similar-sized pieces. Toss with olive oil, minced garlic, and chopped herbs. Roast for 30-35 minutes, stirring halfway through.',
    isFavorite: true,
    nutritionInfo: {
      calories: 180,
      protein: '3g',
      carbs: '25g',
      fat: '7g',
      fiber: '5g'
    }
  },
  {
    id: '3',
    name: 'Tomato Basil Pasta',
    category: 'Dinner',
    prepTime: '30 min',
    difficulty: 'Easy',
    ingredients: [
      'Pasta', 'Fresh tomatoes', 'Fresh basil', 'Garlic', 
      'Olive oil', 'Parmesan cheese', 'Salt and pepper'
    ],
    gardenIngredients: ['tomatoes', 'basil'],
    instructions: 'Cook pasta according to package directions. In a pan, sauté minced garlic in olive oil. Add chopped tomatoes and cook until softened. Stir in torn basil leaves. Toss with pasta and top with grated Parmesan.',
    isFavorite: false,
    nutritionInfo: {
      calories: 320,
      protein: '10g',
      carbs: '50g',
      fat: '9g',
      fiber: '3g'
    }
  }
];

const sampleMeditationSessions: MeditationSession[] = [
  { id: '1', title: 'Morning Garden Meditation', duration: '10 min', completedAt: '2025-05-03T08:30:00Z' },
  { id: '2', title: 'Mindful Planting', duration: '15 min', completedAt: '2025-05-04T09:15:00Z' },
  { id: '3', title: 'Evening Nature Sounds', duration: '20 min', completedAt: '2025-05-05T19:45:00Z' },
  { id: '4', title: 'Garden Mindfulness', duration: '10 min', completedAt: '2025-05-06T08:00:00Z' },
  { id: '5', title: 'Seed to Sprout Meditation', duration: '15 min', completedAt: '2025-05-07T07:30:00Z' },
];

// Provider component
export const GardenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gardenPlots, setGardenPlots] = useState<GardenPlot[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [meditationSessions, setMeditationSessions] = useState<MeditationSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Streak data
  const [currentStreak, setCurrentStreak] = useState(5);
  const [longestStreak, setLongestStreak] = useState(12);
  const [sessionsThisWeek, setSessionsThisWeek] = useState(4);
  const [totalSessions, setTotalSessions] = useState(28);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Try to load data from AsyncStorage
        const plotsData = await AsyncStorage.getItem('gardenPlots');
        const plantsData = await AsyncStorage.getItem('plants');
        const tasksData = await AsyncStorage.getItem('tasks');
        const recipesData = await AsyncStorage.getItem('recipes');
        const meditationsData = await AsyncStorage.getItem('meditationSessions');
        
        // Set data if it exists, otherwise use sample data
        setGardenPlots(plotsData ? JSON.parse(plotsData) : samplePlots);
        setPlants(plantsData ? JSON.parse(plantsData) : samplePlants);
        setTasks(tasksData ? JSON.parse(tasksData) : sampleTasks);
        setRecipes(recipesData ? JSON.parse(recipesData) : sampleRecipes);
        setMeditationSessions(meditationsData ? JSON.parse(meditationsData) : sampleMeditationSessions);
        
        // Calculate streaks based on meditation sessions
        calculateStreaks(meditationsData ? JSON.parse(meditationsData) : sampleMeditationSessions);
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to sample data if there's an error
        setGardenPlots(samplePlots);
        setPlants(samplePlants);
        setTasks(sampleTasks);
        setRecipes(sampleRecipes);
        setMeditationSessions(sampleMeditationSessions);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save data to AsyncStorage whenever it changes
  useEffect(() => {
    const saveData = async () => {
      if (isLoading) return; // Don't save during initial load
      
      try {
        await AsyncStorage.setItem('gardenPlots', JSON.stringify(gardenPlots));
        await AsyncStorage.setItem('plants', JSON.stringify(plants));
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        await AsyncStorage.setItem('recipes', JSON.stringify(recipes));
        await AsyncStorage.setItem('meditationSessions', JSON.stringify(meditationSessions));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };

    saveData();
  }, [gardenPlots, plants, tasks, recipes, meditationSessions, isLoading]);

  // Calculate meditation streaks
  const calculateStreaks = (sessions: MeditationSession[]) => {
    if (!sessions.length) return;
    
    // Sort sessions by date
    const sortedSessions = [...sessions].sort((a, b) => 
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
    
    // Calculate current streak
    let streak = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastSessionDate = new Date(sortedSessions[0].completedAt);
    lastSessionDate.setHours(0, 0, 0, 0);
    
    // Check if the last session was today or yesterday
    const diffTime = Math.abs(today.getTime() - lastSessionDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) {
      // Streak is broken
      setCurrentStreak(0);
    } else {
      // Count consecutive days
      for (let i = 1; i < sortedSessions.length; i++) {
        const currentDate = new Date(sortedSessions[i-1].completedAt);
        currentDate.setHours(0, 0, 0, 0);
        
        const prevDate = new Date(sortedSessions[i].completedAt);
        prevDate.setHours(0, 0, 0, 0);
        
        const dayDiff = Math.ceil(
          Math.abs(currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        
        if (dayDiff === 1) {
          streak++;
        } else {
          break;
        }
      }
      
      setCurrentStreak(streak);
    }
    
    // Calculate longest streak (simplified)
    setLongestStreak(Math.max(streak, 12)); // Using 12 as a placeholder
    
    // Calculate sessions this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const thisWeekSessions = sortedSessions.filter(session => 
      new Date(session.completedAt) >= oneWeekAgo
    ).length;
    
    setSessionsThisWeek(thisWeekSessions);
    setTotalSessions(sortedSessions.length);
  };

  // Garden plot functions
  const addGardenPlot = async (plot: Omit<GardenPlot, 'id' | 'createdAt'>) => {
    const newPlot: GardenPlot = {
      ...plot,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    setGardenPlots(prev => [...prev, newPlot]);
  };

  const updateGardenPlot = async (plot: GardenPlot) => {
    setGardenPlots(prev => 
      prev.map(p => p.id === plot.id ? plot : p)
    );
  };

  const deleteGardenPlot = async (id: string) => {
    // Remove plot
    setGardenPlots(prev => prev.filter(p => p.id !== id));
    
    // Update plants that were in this plot
    setPlants(prev => 
      prev.map(plant => 
        plant.plotId === id 
          ? { ...plant, inGarden: false, plotId: undefined } 
          : plant
      )
    );
    
    // Remove tasks associated with this plot
    setTasks(prev => prev.filter(task => task.plotId !== id));
  };

  // Plant functions
  const addPlant = async (plant: Omit<Plant, 'id'>) => {
    const newPlant: Plant = {
      ...plant,
      id: Date.now().toString()
    };
    
    setPlants(prev => [...prev, newPlant]);
  };

  const updatePlant = async (plant: Plant) => {
    setPlants(prev => 
      prev.map(p => p.id === plant.id ? plant : p)
    );
  };

  const deletePlant = async (id: string) => {
    // Remove plant
    setPlants(prev => prev.filter(p => p.id !== id));
    
    // Remove tasks associated with this plant
    setTasks(prev => prev.filter(task => task.plantId !== id));
    
    // Update plot plant count if needed
    const plantToDelete = plants.find(p => p.id === id);
    if (plantToDelete?.plotId) {
      setGardenPlots(prev => 
        prev.map(plot => 
          plot.id === plantToDelete.plotId 
            ? { ...plot, plants: Math.max(0, plot.plants - 1) } 
            : plot
        )
      );
    }
  };

  const addPlantToGarden = async (plantId: string, plotId: string) => {
    // Update the plant
    setPlants(prev => 
      prev.map(plant => 
        plant.id === plantId 
          ? { ...plant, inGarden: true, plotId } 
          : plant
      )
    );
    
    // Update the plot's plant count
    setGardenPlots(prev => 
      prev.map(plot => 
        plot.id === plotId 
          ? { ...plot, plants: plot.plants + 1 } 
          : plot
      )
    );
  };

  const removePlantFromGarden = async (plantId: string) => {
    // Get the plant to find its plot
    const plant = plants.find(p => p.id === plantId);
    const plotId = plant?.plotId;
    
    // Update the plant
    setPlants(prev => 
      prev.map(p => 
        p.id === plantId 
          ? { ...p, inGarden: false, plotId: undefined } 
          : p
      )
    );
    
    // Update the plot's plant count if needed
    if (plotId) {
      setGardenPlots(prev => 
        prev.map(plot => 
          plot.id === plotId 
            ? { ...plot, plants: Math.max(0, plot.plants - 1) } 
            : plot
        )
      );
    }
  };

  // Task functions
  const addTask = async (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString()
    };
    
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = async (task: Task) => {
    setTasks(prev => 
      prev.map(t => t.id === task.id ? task : t)
    );
  };

  const deleteTask = async (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleTaskCompletion = async (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed } 
          : task
      )
    );
  };

  // Meditation functions
  const addMeditationSession = async (session: Omit<MeditationSession, 'id' | 'completedAt'>) => {
    const newSession: MeditationSession = {
      ...session,
      id: Date.now().toString(),
      completedAt: new Date().toISOString()
    };
    
    const updatedSessions = [...meditationSessions, newSession];
    setMeditationSessions(updatedSessions);
    
    // Recalculate streaks
    calculateStreaks(updatedSessions);
  };

  // Recipe functions
  const toggleRecipeFavorite = async (id: string) => {
    setRecipes(prev => 
      prev.map(recipe => 
        recipe.id === id 
          ? { ...recipe, isFavorite: !recipe.isFavorite } 
          : recipe
      )
    );
  };

  // Context value
  const value = {
    gardenPlots,
    addGardenPlot,
    updateGardenPlot,
    deleteGardenPlot,
    
    plants,
    addPlant,
    updatePlant,
    deletePlant,
    addPlantToGarden,
    removePlantFromGarden,
    
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    
    meditationSessions,
    addMeditationSession,
    
    recipes,
    toggleRecipeFavorite,
    
    currentStreak,
    longestStreak,
    sessionsThisWeek,
    totalSessions,
    
    isLoading
  };

  return (
    <GardenContext.Provider value={value}>
      {children}
    </GardenContext.Provider>
  );
};

// Custom hook to use the garden context
export const useGarden = () => {
  const context = useContext(GardenContext);
  if (context === undefined) {
    throw new Error('useGarden must be used within a GardenProvider');
  }
  return context;
};
