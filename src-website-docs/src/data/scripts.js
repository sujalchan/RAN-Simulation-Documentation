/* Script reference metadata. */
import { script } from './helpers.js';

const scripts = [
    script('material-lab', 'ReplicatedStorage/FrequencyData.luau', 'Shared list of four frequency options, a band-name lookup table, and the default 3500 MHz option.', {
      state: 'Options stores display name, band, divisor, and maxDistance; ByBand indexes the same entries; Default points to 3500 MHz.',
      functions: ['No named functions; a loop builds the ByBand lookup from Options.'],
      services: ['ReplicatedStorage (container)'], objects: ['FrequencyData module'],
      modules: ['Required by PlayerSignalHandler and RoomOneDashboard.'],
      related: ['simulation/frequency', 'configuration'], terms: ['700 MHz', '1800 MHz', '2100 MHz', '3500 MHz']
    }),
    script('material-lab', 'ServerScriptService/RoomDetection.luau', 'Samples room volumes and nearby antenna parts, then publishes player room and antenna attributes.', {
      functions: ['isPointInsideBox — tests a position in a rotated zone part.', 'getClosestAntenna — selects a configured antenna within a 25 stud radius.', 'setupPlayer — initializes room and antenna attributes.'],
      state: 'CHECK_INTERVAL is 0.1 seconds; playerStates caches each player’s previous room flags so changes are published on transitions.',
      services: ['Players', 'RunService'], objects: ['RoomOneZone', 'RoomTwoZone', 'OmniPart', 'DirectionalPart', 'MainPart'],
      events: [['Listens', 'Heartbeat', 'periodic room and antenna checks'], ['Writes', 'Player attributes', 'InRoomOne, InRoomTwo, AntennaType, BeamWidth, TiltAngle, Azimuth, Elevation']],
      related: ['architecture', 'experience/material-lab', 'interface'], terms: ['zone', 'antenna detection']
    }),
    script('material-lab', 'ServerScriptService/PlayerShrinkHandler.luau', 'Shrinks a character and walk speed in room one, then restores cached original values after leaving.', {
      functions: ['saveOriginalValues — caches scale and speed.', 'shrinkPlayer — applies the 0.2 multiplier.', 'resetPlayer — restores values and clears the cache.', 'updatePlayerSize — responds to InRoomOne.'],
      state: 'SHRINK_MULTIPLIER = 0.2; RESET_UPWARD_OFFSET = 2.5; tables cache each player’s original scales, walk speed, and attribute connection.',
      services: ['Players'], objects: ['Humanoid scale values', 'HumanoidRootPart', 'InRoomOne attribute'],
      events: [['Listens', 'AttributeChanged', 'InRoomOne, plus character and player lifecycle']],
      related: ['experience/material-lab', 'architecture']
    }),
    script('material-lab', 'ServerScriptService/PlaceMaterialHandler.luau', 'Validates material placement requests and clones allowed blocks into the room-one material folder.', {
      functions: ['snap and snapY — align submitted positions to the 2 stud grid.', 'isPlayerOnHeatmap — checks room and player position.', 'isPositionOnHeatmap — checks the requested position.'],
      state: 'ALLOWED_MATERIALS permits Concrete, Metal, and Wood; GRID_SIZE = 2; MAX_DISTANCE = 50 studs; bounds constrain X and Z.',
      services: ['ReplicatedStorage', 'Players'], objects: ['PlaceableMaterials', 'LevelOneMaterials', 'InRoomOne attribute'],
      events: [['Receives', 'PlaceItemEvent', 'materialName and CFrame']], related: ['simulation/materials', 'experience/material-lab'], terms: ['grid snapping', 'placement']
    }),
    script('material-lab', 'ServerScriptService/PlayerSignalHandler.luau', 'Computes per-player source distance, first material hit, RSRP-like value, and SINR display value.', {
      functions: ['findClosestSignalSource — selects the nearest source.', 'getMaterialAttenuation — raycasts through LevelOneMaterials.', 'calculateRSRP — applies frequency divisor, material loss, and smoothed noise.', 'calculateSINR — compares serving power with other sources and a noise floor.', 'updatePlayerSignal — publishes player attributes.'],
      state: 'CHECK_INTERVAL = 0.1 seconds; NOISE_FLOOR_DBM = -100; playerNoise caches the smoothed random offset.',
      services: ['Players', 'RunService', 'ReplicatedStorage'], objects: ['SignalSourcesFolder', 'LevelOneMaterials', 'player signal attributes'],
      modules: ['FrequencyData'], events: [['Receives', 'FrequencyChangedEvent', 'frequencyBand; validates it against FrequencyData.ByBand'], ['Writes', 'Player attributes', 'FrequencyBand, RSRP, SINR, Material, Attenuation, TowerDistance, ClosestSignalSource']],
      related: ['simulation/signal', 'simulation/frequency', 'simulation/materials'], terms: ['RSRP', 'SINR', 'interference', 'attenuation']
    }),
    script('material-lab', 'ServerScriptService/HeatmapHandler.luau', 'Creates the room-one heatmap grid and incrementally colors tiles for RSRP or SINR.', {
      functions: ['valueToColour — maps a normalized value through red, yellow, and green.', 'getPreferredMaterial — chooses one intersecting placed material by priority.', 'calculateRSRPDbm — maps distance to the configured range and applies a decaying material shadow.', 'updateRSRP and updateSINR — refresh one random tile each call.'],
      state: 'ROWS = 24, COLUMNS = 30, SPACING = 2; 30 random tiles update per Heartbeat; maxDistance starts at 30 and is changed by FrequencyChangedEvent.',
      services: ['RunService', 'ReplicatedStorage', 'Workspace'], objects: ['LevelOne.HeatmapTile', 'LevelOneMaterials', 'SignalSourcesFolder', 'HeatmapGrid'],
      events: [['Receives', 'FrequencyChangedEvent', 'frequencyBand and newMaxDistance; this handler uses the distance argument'], ['Receives', 'ToggleHeatmapEvent', 'RSRP or SINR mode']],
      related: ['simulation/heatmap', 'simulation/signal', 'configuration'], terms: ['heatmap', 'RSRP', 'SINR', 'shadow falloff']
    }),
    script('material-lab', 'ServerScriptService/AntennaBeamSimulation.luau', 'Builds colored point visualizations of directional, narrow, and omnidirectional antenna patterns.', {
      functions: ['numberToColor — interpolates over a color palette.', 'createDirectionalBeam — creates and updates a sampled directional visualization.', 'pointStrength (nested) — maps angular offset and configured gain to 0–1 visual strength.'],
      state: 'Beam settings include radius, sample density, horizontal and vertical beamwidth, front-to-back ratio, and orientation.',
      services: ['Workspace', 'ReplicatedStorage'], objects: ['DirectionalPart', 'MainPart', 'beam visualization folders'],
      events: [['Receives', 'UpdateAntennaEvent', 'antennaType, elevation, azimuth; updates directional or narrow beam']],
      related: ['simulation/antennas', 'experience/material-lab'], terms: ['beamforming', 'azimuth', 'elevation', 'gain']
    }),
    script('material-lab', 'ServerScriptService/NPCSpawner.luau', 'Maintains the material-lab NPC count and starts simple room-one wandering behavior.', {
      functions: ['getRandomPositionInRoomOne — samples inside a padded zone.', 'spawnNPC — clones, colors, and starts movement.', 'removeNPC and getNPCCount — adjust and report the folder count.'],
      state: 'MAX_NPCS = 50; collision group NPC prevents NPC-to-NPC collisions; the script chooses shirt and pants colors.',
      services: ['Players', 'ServerStorage', 'ReplicatedStorage', 'Workspace', 'PhysicsService'], objects: ['NPCTemplate', 'NPCs', 'RoomOneZone'],
      events: [['Receives / sends', 'NPCSpawnEvent', 'setCount/getCount request and numeric count response']], related: ['experience/material-lab', 'events'], terms: ['NPC count']
    }),
    script('material-lab', 'StarterPlayer/StarterPlayerScripts/RoomCameraZoom.luau', 'Tweens the local player’s camera zoom as room-one presence changes.', {
      functions: ['tweenCameraZoom — animates zoom limits and optionally restores them.', 'updateCameraZoom — chooses close or normal target based on InRoomOne.'],
      state: 'Saved initial camera limits, SHRUNK_ZOOM = 2.5, NORMAL_ZOOM = 12, and the active Tween.',
      services: ['Players', 'TweenService'], objects: ['LocalPlayer', 'InRoomOne attribute'],
      events: [['Listens', 'AttributeChanged', 'InRoomOne']], related: ['experience/material-lab', 'interface']
    }),
    script('material-lab', 'StarterPlayer/StarterPlayerScripts/RoomOneMaterialPlacer.luau', 'Displays a local material preview, calculates grid placement from the cursor, and requests server placement.', {
      functions: ['createPreview and selectMaterial — switch the translucent local block.', 'getPlacementCFrame — raycasts and aligns to a tile or existing block face.', 'placeItem — sends a selected material and transform.'],
      state: 'selectedMaterialName, rotationY, previewPart, currentPlacementCFrame, and placementEnabled hold local tool state; X/Z bounds match the placement area.',
      services: ['Players', 'ReplicatedStorage', 'RunService', 'UserInputService'], objects: ['PlaceableMaterials', 'HeatmapGrid', 'LevelOneMaterials'],
      events: [['Sends', 'PlaceItemEvent', 'selectedMaterialName and currentPlacementCFrame'], ['Listens', 'RenderStepped / InputBegan', 'moves preview and handles 1–3, R, M, and click']],
      related: ['simulation/materials', 'experience/material-lab'], terms: ['preview', 'grid snapping']
    }),
    script('material-lab', 'StarterPlayer/StarterPlayerScripts/RayVisual.luau', 'Draws a client-local neon part between the player and SignalSource while room one is active.', {
      functions: ['setupCharacter — caches the character root as the ray origin.'],
      state: 'visualPart is resized and centered every RenderStepped update; it is hidden outside room one.',
      services: ['Players', 'RunService'], objects: ['SignalSource', 'HumanoidRootPart', 'InRoomOne attribute'],
      events: [['Listens', 'CharacterAdded / RenderStepped', 'refreshes the root reference and visual length']], related: ['experience/material-lab', 'interface']
    }),
    script('material-lab', 'StarterPlayer/StarterCharacterScripts/git-track.luau', 'Temporary placeholder that prints a reminder when it runs.', {
      state: 'No simulation state or configuration.', objects: ['StarterCharacterScripts'], related: ['code-reference'], terms: ['placeholder']
    }),
    script('material-lab', 'StarterGui/DashboardGui/RoomOneDashboard.luau', 'Shows room-one signal, quality, tower, material experiment, frequency, and NPC information.', {
      functions: ['updateDashboardVisibility — reacts to room flags.', 'sendFrequencyToServer — sends a changed slider selection.', 'updateUI — refreshes metrics, badges, capacity, and material insight text.'],
      state: 'frequencyOptions, npcCount, baseSignalValue, slider index, and tween state drive the dashboard.',
      services: ['TweenService', 'Players', 'RunService', 'ReplicatedStorage'], objects: ['DashboardGui.Room1Frame', 'player signal attributes'], modules: ['FrequencyData (required by the script)'],
      events: [['Sends', 'FrequencyChangedEvent', 'frequency band and maxDistance'], ['Receives / sends', 'NPCSpawnEvent', 'count updates / initial getCount']],
      related: ['interface', 'simulation/frequency', 'simulation/signal'], terms: ['RSRP', 'SINR', 'frequency slider']
    }),
    script('material-lab', 'StarterGui/DashboardGui/RoomTwoDashboard.luau', 'Displays room-two antenna labels and a local nearest-antenna signal estimate.', {
      functions: ['getAntennaSignal — computes a bounded distance-based display value.', 'updateVisibility — shows the panel only in room two.', 'updateRoom2 — paints labels, bars, badges, and insight text.'],
      state: 'A five-bar display and signal/status labels are refreshed on RenderStepped.',
      services: ['Players', 'RunService'], objects: ['DashboardGui.Room2Frame', 'OmniPart', 'DirectionalPart', 'MainPart', 'player antenna attributes'],
      events: [['Listens', 'AttributeChanged / RenderStepped', 'room visibility and live display refresh']], related: ['interface', 'simulation/antennas'], terms: ['antenna', 'room two']
    }),
    script('material-lab', 'StarterGui/DashboardGui/SliderControls.luau', 'Builds azimuth and elevation sliders and sends the selected antenna orientation.', {
      functions: ['createSlider — constructs a control and holds its value.', 'sendAntennaUpdate — sends permitted antenna settings.', 'updateVisibility — chooses controls for Directional or NarrowBeam.'],
      state: 'activeSlider, isDragging, azimuthSlider, and elevationSlider track client control state.',
      services: ['Players', 'UserInputService', 'ReplicatedStorage'], objects: ['AntennaControlGui', 'ClosestSignalSource and InRoomTwo attributes'],
      events: [['Sends', 'UpdateAntennaEvent', 'antennaType, elevation, azimuth']], related: ['interface', 'simulation/antennas'], terms: ['beamforming', 'slider']
    }),
    script('material-lab', 'StarterGui/DashboardGui/HeatmapToggle.luau', 'Switches the requested heatmap display between RSRP and SINR.', {
      state: 'showingSINR tracks the local button label and requested mode.', services: ['Players', 'ReplicatedStorage'], objects: ['DashboardGui.Room1Frame.HeatmapButton'],
      events: [['Sends', 'ToggleHeatmapEvent', 'RSRP or SINR string']], related: ['simulation/heatmap', 'interface'], terms: ['RSRP', 'SINR']
    }),
    script('material-lab', 'StarterGui/DashboardGui/PopUpScript.luau', 'Displays antenna settings and type-specific explanatory text in the room-two popup.', {
      functions: ['updatePopUp — reads antenna attributes and refreshes labels and guidance.'],
      state: 'The popup starts hidden and toggles from OpenPopUpButton and CloseButton.', services: ['Players'], objects: ['DashboardGui.PopUpFrame', 'DashboardGui.Room2Frame', 'antenna attributes'],
      events: [['Listens', 'AttributeChanged / button clicks', 'antenna values and popup visibility']], related: ['interface', 'simulation/antennas']
    }),
    script('material-lab', 'StarterGui/NPCControlScript.luau', 'Creates a room-one NPC count slider and synchronizes its count with the server.', {
      functions: ['updateSlider — clamps and displays a count.', 'sendCountToServer — sends a changed target count.'],
      state: 'MAX_NPCS = 50; currentCount, lastSentCount, and isDragging hold local slider state.', services: ['Players', 'ReplicatedStorage', 'UserInputService'], objects: ['NPCControlGui', 'InRoomOne attribute'],
      events: [['Sends / receives', 'NPCSpawnEvent', 'setCount/getCount and numeric count response']], related: ['interface', 'experience/material-lab']
    }),

    script('small-town', 'ServerScriptService/StartGame.luau', 'Starts a session from a world prompt and resets placed antennas, NPCs, speed, and position on request.', {
      functions: ['Prompt handler — records the active player and fires StartGame.', 'ResetGame handler — checks active player, clears owned placed antennas and NPCs, and sends completion.'],
      state: 'activePlayer tracks the current session owner.', services: ['Players', 'ReplicatedStorage'], objects: ['StartButton.ProximityPrompt', 'PlacedAntennas', 'NPCs', 'SpawnLocation'],
      events: [['Sends', 'StartGame', 'to the player who triggered the prompt'], ['Receives / sends', 'ResetGame', 'client reset request / completion notification'], ['Sends', 'NPCSpawnEvent', 'count 0 after reset']],
      related: ['experience/small-town', 'events']
    }),
    script('small-town', 'ServerScriptService/AntennaServer.luau', 'Validates placement and deletion requests, positions antenna models, and stores ownership.', {
      functions: ['computeBaseCenter — finds the model base so rotated placement keeps it on target.', 'PlaceAntenna handler — validates type, Vector3 position, and rotation.', 'DeleteAntenna handler — checks the Owner tag.'],
      state: 'validAntennas and antennaDisplayNames map permitted templates; antennaOwners also tracks placed model ownership.',
      services: ['ReplicatedStorage', 'Workspace'], objects: ['AntennaModels', 'PlacedAntennas', 'Owner StringValue'],
      events: [['Receives', 'PlaceAntenna', 'antennaName, position, rotationAngle'], ['Receives', 'DeleteAntenna', 'antennaInstanceName']],
      related: ['simulation/antennas', 'experience/small-town'], terms: ['ownership', 'placement']
    }),
    script('small-town', 'ServerScriptService/AntennaSignalManager.luau', 'Selects a fixed tower or placed antenna for each player and publishes its estimated signal and load.', {
      functions: ['getSignalOriginPos — selects SignalOrigin or pivot.', 'getOuterRadius and getTowerOuterRadius — combine type range and frequency divisor.', 'Heartbeat handler — chooses an in-range antenna when possible, applies distance and NPC load penalties.'],
      state: 'Frequency divisors and antenna/tower type radius tables are local to this script; update cadence is 0.2 seconds.',
      services: ['Players', 'RunService', 'Workspace'], objects: ['CellTowers', 'PlacedAntennas', 'NPCConnections attribute'],
      events: [['Writes', 'Player attributes', 'PlacedAntennaName, PlacedAntennaSignal, PlacedAntennaNPCLoad, PlacedAntennaInRange']],
      related: ['simulation/signal', 'simulation/antennas', 'experience/small-town'], terms: ['NPC load', 'coverage']
    }),
    script('small-town', 'ServerScriptService/RayMaterialDetection.luau', 'Raycasts toward the nearest fixed tower through town attenuation zones and publishes the detected zone.', {
      functions: ['getClosestTower — chooses the nearest CellTowers model.', 'updatePlayerMaterial — raycasts to SignalOrigin and writes material, attenuation, and tower attributes.'],
      state: 'CHECK_INTERVAL = 0.1 seconds; a raycast filter includes TownAttenuationZones.', services: ['Players', 'RunService', 'Workspace'],
      objects: ['CellTowers', 'TownAttenuationZones', 'SignalOrigin'], events: [['Writes', 'Player attributes', 'Material, Attenuation, ConnectedTower, ConnectedTowerType']],
      related: ['simulation/materials', 'simulation/signal', 'experience/small-town']
    }),
    script('small-town', 'ServerScriptService/TowerSignalManager.luau', 'Computes a fixed-tower distance and attenuation signal estimate for player attributes.', {
      functions: ['getClosestTower — reads an initial cache of CellTowers with SignalOrigin.', 'updatePlayerSignal — applies frequency divisor, tower max-power offset, attenuation, and small noise.'],
      state: 'Local tower type range and frequency tables; DEFAULT_FREQUENCY = 2100 MHz; update cadence is 0.2 seconds.',
      services: ['Players', 'RunService', 'Workspace'], objects: ['CellTowers', 'SignalOrigin', 'player material attributes'],
      events: [['Writes', 'Player attributes', 'ConnectedTower, ConnectedTowerType, RSRP, SignalBars, TowerDistance, FrequencyBand']],
      related: ['simulation/signal', 'simulation/frequency', 'experience/small-town'], terms: ['RSRP', 'tower']
    }),
    script('small-town', 'ServerScriptService/WallDetection.luau', 'Draws a server-owned ray part from each player to Source and checks overlapping parts for material attenuation.', {
      functions: ['updateRay — sizes the visual part and calls GetPartsInPart to inspect overlaps.'],
      state: 'One named RayVisual part is used per player and destroyed on PlayerRemoving.', services: ['Players', 'Workspace'],
      objects: ['Source', 'Cell Tower', 'player RayVisual part'], events: [['Writes', 'Player attributes', 'Material and Attenuation']],
      related: ['simulation/materials', 'experience/small-town']
    }),
    script('small-town', 'ServerScriptService/LEDManager.luau', 'Toggles marked LED SelectionBoxes using Lighting.TimeOfDay.', {
      functions: ['updateLEDs — shows boxes from 18:00 to 06:00.'],
      state: 'ledBoxes holds SelectionBoxes found at startup by IsLED attribute or LED-named parent.', services: ['Lighting', 'Workspace'],
      objects: ['SelectionBox', 'IsLED attribute'], events: [['Listens', 'Lighting property changes', 'TimeOfDay and Changed']],
      related: ['experience/small-town'], terms: ['environment', 'lighting']
    }),
    script('small-town', 'ServerScriptService/NPCSpawner.luau', 'Spawns wandering NPCs and tracks their nearest tower or placed antenna as a connection count.', {
      functions: ['getRandomSpawnPosition — samples ground positions with raycasts and spacing checks.', 'findNearestTower and reevaluateNPCConnections — assign nearest tower by SignalOrigin.', 'spawnNPC, removeNPC, getNPCCount — maintain population and load attributes.'],
      state: 'MAX_NPCS = 50, SPAWN_RADIUS = 40, MIN_SPAWN_DISTANCE = 5; towerConnections holds counts by model name.',
      services: ['Players', 'ServerStorage', 'ReplicatedStorage', 'Workspace', 'PhysicsService'], objects: ['NPCTemplate', 'NPCs', 'CellTowers', 'PlacedAntennas'],
      events: [['Receives / sends', 'NPCSpawnEvent', 'add/remove/setCount/getCount requests and numeric count response'], ['Receives', 'ResetGame', 'clears NPC connection tracking']],
      related: ['experience/small-town', 'simulation/antennas', 'simulation/signal'], terms: ['NPC load']
    }),
    script('small-town', 'StarterPlayer/StarterPlayerScripts/Antennaplacer.luau', 'Creates the placement GUI, manages antenna preview and budget, and submits place/delete/reset requests.', {
      functions: ['computeBaseCenter and createPreview — align the model preview.', 'getMousePosition and rotatePreview — update cursor placement and orientation.', 'showResultsPopup and createGUI — manage the activity UI.'],
      state: 'INITIAL_BUDGET = 850000; antennaOptions maps four model names to costs; selected antenna, preview, angle, and current budget are local.',
      services: ['Players', 'ReplicatedStorage', 'RunService', 'UserInputService'], objects: ['AntennaModels', 'PlacedAntennas', 'player GUI', 'CoverageScore attribute'],
      events: [['Sends', 'PlaceAntenna', 'model name, Vector3 position, rotation'], ['Sends', 'DeleteAntenna', 'model instance name'], ['Sends / receives', 'ResetGame', 'reset request and completion'], ['Receives', 'StartGame', 'starts placement activity']],
      related: ['experience/small-town', 'simulation/antennas', 'interface'], terms: ['budget', 'coverage score']
    }),
    script('small-town', 'StarterPlayer/StarterPlayerScripts/CellTowerVisualizer.luau', 'Draws concentric signal-range spheres and estimates map coverage by grid sampling.', {
      functions: ['getTowerType and getMaxDistance — resolve model types and range.', 'collectCoverageSpheres and calculateCoverage — sample a 50 × 50 map grid.', 'updateTowerVisuals and createToggleUI — maintain local spheres and coverage UI.'],
      state: 'MAP_BOUNDS sets a rectangular sampling area; frequencyData changes sphere radii; isVisible controls drawn spheres.',
      services: ['Players', 'RunService', 'Workspace'], objects: ['CellTowers', 'PlacedAntennas', 'AllSignalVisuals', 'CoverageScore attribute'],
      events: [['Writes', 'Player attribute', 'CoverageScore for the results UI'], ['Listens', 'UI click / timer', 'toggles spheres and refreshes the estimate']],
      related: ['simulation/antennas', 'experience/small-town', 'interface'], terms: ['coverage', '50x50']
    }),
    script('small-town', 'StarterPlayer/StarterPlayerScripts/ThirdPersonCamera.luau', 'Restores third-person camera control after StartGame and adjusts zoom from wheel and keyboard input.', {
      functions: ['setZoom — clamps and applies a target zoom, then restores allowed limits.'],
      state: 'defaultDistance, minDistance, maxDistance, and ZOOM_STEP control local camera movement.',
      services: ['Players', 'ReplicatedStorage', 'UserInputService'], objects: ['CurrentCamera', 'ZoomInfoGui'],
      events: [['Receives', 'StartGame', 'restores custom camera control'], ['Listens', 'InputChanged / InputBegan', 'mouse wheel and keyboard zoom']],
      related: ['experience/small-town', 'interface']
    }),
    script('small-town', 'StarterGui/SpeedControlScript.luau', 'Creates a walk-speed slider and adjusts the local character’s Humanoid speed.', {
      functions: ['updateSlider — maps speed to slider position.', 'applySpeed — sets Humanoid.WalkSpeed.', 'setBaseSpeed — combines UI and character update.'],
      state: 'MIN_SPEED = 16, MAX_SPEED = 130, SPRINT_MULTIPLIER = 3; drag and hover flags control local UI behavior.',
      services: ['Players', 'UserInputService'], objects: ['SpeedControlGui', 'Humanoid'],
      events: [['Receives', 'StartGame', 'sets speed to 130'], ['Receives', 'ResetGame', 'resets to MIN_SPEED']],
      related: ['experience/small-town', 'interface']
    }),
    script('small-town', 'StarterGui/DashboardGui/TownDashboardScript.luau', 'Renders selected antenna signal, range status, NPC load, and capacity graphics.', {
      functions: ['findUIElements — locates the dashboard cards.', 'updateSignalBars and clearSignalBars — map RSRP-like value to five bars.'],
      state: 'npcCount stores received count; bars and UI references cache dashboard widgets.',
      services: ['Players', 'RunService', 'ReplicatedStorage'], objects: ['DashboardGui.TownFrame', 'PlacedAntenna* player attributes'],
      events: [['Receives / sends', 'NPCSpawnEvent', 'count updates / initial getCount'], ['Listens', 'RenderStepped', 'refreshes dashboard display']],
      related: ['interface', 'experience/small-town', 'simulation/signal']
    }),
    script('small-town', 'StarterGui/NPCControlScript.luau', 'Creates the small-town NPC count slider and synchronizes it with the server.', {
      functions: ['updateSlider — clamps and renders the count.', 'sendCountToServer — sends changed target count.', 'updatePlacementState — sets CanPlaceAntenna while hovering or dragging.'],
      state: 'MAX_NPCS = 50; currentCount, lastSentCount, isDragging, and isHovering hold local UI state.',
      services: ['Players', 'ReplicatedStorage', 'UserInputService'], objects: ['NPCControlGui', 'CanPlaceAntenna attribute'],
      events: [['Sends / receives', 'NPCSpawnEvent', 'setCount/getCount and numeric count response'], ['Receives', 'ResetGame', 'sets the slider back to zero']],
      related: ['interface', 'experience/small-town']
    })
  ]

export default scripts;
