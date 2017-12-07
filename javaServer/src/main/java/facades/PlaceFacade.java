package facades;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import entity.Place;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

// @author Lasse
public class PlaceFacade implements IplaceFacade {

    EntityManagerFactory emf;

    public PlaceFacade(EntityManagerFactory emf) {
        this.emf = emf;
    }

    public PlaceFacade() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
    
    @Override
    public Place getPlace(Long id) {
        EntityManager em = emf.createEntityManager();
        try {
            Place place  = em.find(Place.class, id);
            return place;
        } catch(Exception e){
            e.getMessage();
        }
        return null;
    }
    
    public void createPlace(Place place) {
        EntityManager em = getEntityManager();
        em.getTransaction().begin();

        em.persist(place);
        em.getTransaction().commit();
        em.close();
    }

    public List<Place> getPlaces() {
        EntityManager em = getEntityManager();
        List<Place> placeList = new ArrayList();
        try {
            Query query = em.createQuery("SELECT e FROM SEED_PLACE e");
            placeList = query.getResultList();
            return placeList;
        } catch (Exception e) {
            System.out.println("Desvaerre gik der noget galt");
        } finally {
            em.close();
        }
        return null;
    }
    
    @Override
    public Place editPlace(Place place) {
        EntityManager em = emf.createEntityManager();
        Place p;
        try {
            em.getTransaction().begin();
            p = em.find(Place.class, place.getId());
            if (p != null){
                p = place;
                em.merge(p);
                em.getTransaction().commit();
            }
        } finally {
            em.close();
        }
        return p;
    }
    
    @Override
    public void deletePlace(Long id) {
        EntityManager em = emf.createEntityManager();
        
        Place p = em.find(Place.class, (long) id);
        
        try{
            em.getTransaction().begin();
            em.remove(p);
            em.getTransaction().commit();
        }finally{
            em.close();
        }
    }
    
    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu_development");
        Place p = new Place();
        p.setDescription("Et sted hvor man ryger fed");
        p.setImageURL("etsted/andetsted/billede.jpg");
        p.setLatitude("8.0124155");
        p.setLongitude("3.5263644");
        p.setStreet("PrinsesseGade");
        p.setZip("33333");
        new PlaceFacade(emf).createPlace(p);
    }
}
