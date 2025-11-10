// CubeSat Telemetry Data Generator
// Simulates realistic telemetry data for dashboard display

export interface PowerSystem {
  batteryLevel: number; // 0-100%
  solarPanelOutput: number; // Watts
  powerConsumption: number; // Watts
  chargingStatus: "charging" | "discharging" | "idle";
}

export interface ThermalSystem {
  cpuTemp: number; // °C
  batteryTemp: number; // °C
  internalTemp: number; // °C
}

export interface CommunicationSystem {
  signalStrength: number; // dBm
  uplinkStatus: "connected" | "lost";
  downlinkStatus: "connected" | "lost";
  lastContact: Date;
}

export interface Anomaly {
  time: Date;
  system: string;
  severity: "low" | "medium" | "high" | "critical";
  actionTaken: string;
}

export interface AIRepairModule {
  anomaliesDetected: Anomaly[];
  aiStatus: "monitoring" | "repairing" | "idle";
  confidenceScore: number; // 0-1
}

export interface MissionSummary {
  missionTime: number; // hours since launch
  totalAnomalies: number;
  repairedAnomalies: number;
}

export interface CubeSatTelemetry {
  powerSystem: PowerSystem;
  thermalSystem: ThermalSystem;
  communicationSystem: CommunicationSystem;
  aiRepairModule: AIRepairModule;
  missionSummary: MissionSummary;
  lastUpdated: Date;
}

// Utility functions for realistic random data
const randomBetween = (min: number, max: number): number => 
  Math.random() * (max - min) + min;

const randomChoice = <T>(array: T[]): T => 
  array[Math.floor(Math.random() * array.length)];

// Generate realistic anomaly data
const generateRandomAnomaly = (): Anomaly => {
  const systems = ["Power", "Thermal", "Communication", "Navigation", "AI Core"];
  const severities: Anomaly['severity'][] = ["low", "medium", "high", "critical"];
  const actions = [
    "Auto-corrected voltage fluctuation",
    "Rerouted power distribution",
    "Thermal regulation activated",
    "Signal boost applied",
    "System restart initiated",
    "Backup systems engaged",
    "Self-diagnostic completed"
  ];

  return {
    time: new Date(Date.now() - Math.random() * 86400000), // Last 24 hours
    system: randomChoice(systems),
    severity: randomChoice(severities),
    actionTaken: randomChoice(actions)
  };
};

// Initial telemetry data
let currentTelemetry: CubeSatTelemetry = {
  powerSystem: {
    batteryLevel: 85,
    solarPanelOutput: 12.5,
    powerConsumption: 8.2,
    chargingStatus: "charging"
  },
  thermalSystem: {
    cpuTemp: 42,
    batteryTemp: 18,
    internalTemp: 22
  },
  communicationSystem: {
    signalStrength: -75,
    uplinkStatus: "connected",
    downlinkStatus: "connected",
    lastContact: new Date()
  },
  aiRepairModule: {
    anomaliesDetected: Array.from({ length: 5 }, generateRandomAnomaly),
    aiStatus: "monitoring",
    confidenceScore: 0.94
  },
  missionSummary: {
    missionTime: 1247, // ~52 days
    totalAnomalies: 23,
    repairedAnomalies: 21
  },
  lastUpdated: new Date()
};

// Generate updated telemetry data with realistic variations
export const generateTelemetry = (): CubeSatTelemetry => {
  // Power system variations
  const batteryDelta = randomBetween(-2, 3);
  const solarVariation = randomBetween(0.8, 1.2);
  
  currentTelemetry.powerSystem.batteryLevel = Math.max(0, Math.min(100, 
    currentTelemetry.powerSystem.batteryLevel + batteryDelta));
  
  // Solar output varies with orbital position (day/night cycle simulation)
  const orbitalPhase = (Date.now() / 1000) % 5400; // 90-minute orbit simulation
  const solarMultiplier = Math.max(0, Math.sin(orbitalPhase / 5400 * 2 * Math.PI));
  currentTelemetry.powerSystem.solarPanelOutput = 
    randomBetween(10, 15) * solarMultiplier * solarVariation;
  
  currentTelemetry.powerSystem.powerConsumption = randomBetween(6, 12);
  
  // Determine charging status based on power balance
  const powerBalance = currentTelemetry.powerSystem.solarPanelOutput - 
                     currentTelemetry.powerSystem.powerConsumption;
  
  if (powerBalance > 1) {
    currentTelemetry.powerSystem.chargingStatus = "charging";
  } else if (powerBalance < -1) {
    currentTelemetry.powerSystem.chargingStatus = "discharging";
  } else {
    currentTelemetry.powerSystem.chargingStatus = "idle";
  }

  // Thermal system variations
  currentTelemetry.thermalSystem.cpuTemp = randomBetween(35, 55);
  currentTelemetry.thermalSystem.batteryTemp = randomBetween(15, 25);
  currentTelemetry.thermalSystem.internalTemp = randomBetween(18, 28);

  // Communication system
  currentTelemetry.communicationSystem.signalStrength = randomBetween(-85, -65);
  currentTelemetry.communicationSystem.uplinkStatus = 
    Math.random() > 0.05 ? "connected" : "lost"; // 5% chance of loss
  currentTelemetry.communicationSystem.downlinkStatus = 
    Math.random() > 0.03 ? "connected" : "lost"; // 3% chance of loss
  
  if (currentTelemetry.communicationSystem.uplinkStatus === "connected") {
    currentTelemetry.communicationSystem.lastContact = new Date();
  }

  // AI Repair Module
  currentTelemetry.aiRepairModule.confidenceScore = randomBetween(0.85, 0.98);
  
  // Occasionally add new anomalies (5% chance)
  if (Math.random() < 0.05) {
    currentTelemetry.aiRepairModule.anomaliesDetected.unshift(generateRandomAnomaly());
    currentTelemetry.missionSummary.totalAnomalies++;
    
    // Keep only last 10 anomalies
    if (currentTelemetry.aiRepairModule.anomaliesDetected.length > 10) {
      currentTelemetry.aiRepairModule.anomaliesDetected.pop();
    }
  }

  // AI status based on recent anomalies
  const recentAnomalies = currentTelemetry.aiRepairModule.anomaliesDetected.filter(
    a => Date.now() - a.time.getTime() < 300000 // Last 5 minutes
  );
  
  if (recentAnomalies.length > 0) {
    currentTelemetry.aiRepairModule.aiStatus = "repairing";
    // Simulate repair completion
    if (Math.random() < 0.3) {
      currentTelemetry.missionSummary.repairedAnomalies++;
    }
  } else {
    currentTelemetry.aiRepairModule.aiStatus = "monitoring";
  }

  // Update mission time (increment by ~1 minute per update)
  currentTelemetry.missionSummary.missionTime += randomBetween(0.8, 1.2) / 60;
  
  currentTelemetry.lastUpdated = new Date();
  
  return { ...currentTelemetry };
};

// Export current data
export const getCubeSatTelemetry = (): CubeSatTelemetry => currentTelemetry;

// Auto-update function for real-time simulation
let updateInterval: NodeJS.Timeout | null = null;

export const startTelemetryUpdates = (callback?: (data: CubeSatTelemetry) => void) => {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
  
  updateInterval = setInterval(() => {
    const newData = generateTelemetry();
    if (callback) {
      callback(newData);
    }
  }, 3000); // Update every 3 seconds
  
  return updateInterval;
};

export const stopTelemetryUpdates = () => {
  if (updateInterval) {
    clearInterval(updateInterval);
    updateInterval = null;
  }
};

// Export initial data
export default currentTelemetry;